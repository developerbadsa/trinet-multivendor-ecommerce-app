import crypto from "crypto";
import { ValidationError } from "../../../../packages/error-handler";
import redis from "./../../../../packages/libs/redis/index";
import { sendEmail } from "./SendMail/index";
import { NextFunction } from "express";

export const validateRegistrationData = (
  data: any,
  userType: "user" | "seller"
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { name, email, password, phone_number, country } = data;

  if (
    !name ||
    !email ||
    !password ||
    (userType === "seller" && (!phone_number || !country))
  ) {
    throw new ValidationError("missing required fields");
  }

  if (!emailRegex.test(email)) {
    throw new ValidationError("invalid email format");
  }
};

export const checkOTPrestrictions = async (
  email: string,
  next: NextFunction
) => {
  if (await redis.get(`otp_lock:${email}`)) {
    return next(
      new Error(
        "Too many OTP requests. Please try again later. try after 30 minutes"
      )
    );
  }
  if (await redis.get(`otp_lock_spam:${email}`)) {
    return next(
      new Error(
        "Too many OTP requests. Please try again later.  try after 1 hour"
      )
    );
  }
  if (await redis.get(`otp_cooldown:${email}`)) {
    return next(
      new Error(
        "OTP request cooldown active. Please wait before requesting another OTP. try after 1 minute"
      )
    );
  }
};

// otp tracking for spam prevention
export const trackOTPRequests = async (email: string, next: NextFunction) => {
  const otpRequestKey = `otp_request_count:${email}`;

  let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");

  if (otpRequests >= 2) {
    await redis.set(`otp_spam_lock:${email}`, "locked", "EX", 3600); // 1 hour lock

    return next(
      new ValidationError(
        "Too many OTP requests. Please try again later. try after 1 hour"
      )
    );
  }

  await redis.set(otpRequestKey, otpRequests + 1, "EX", 3600); // count resets after 1 hour
};

// create otp and send opt to email 
export const sendOTP = async (
  name: string,
  email: string,
  template: string
) => {
  const otp = crypto.randomInt(10000, 99999).toString();

  // send email

  sendEmail(email, "Verify Email with OTP", template, { name, otp });
  await redis.set(`otp:${email}`, otp, "EX", 300); // OTP valid for 5 minutes
  await redis.set(`otp_cooldown:${email}`, "true", "EX", 60); // Cooldown period of 1 minute
};
