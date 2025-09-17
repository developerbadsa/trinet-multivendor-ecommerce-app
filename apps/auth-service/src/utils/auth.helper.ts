import crypto from "crypto";
import { ValidationError } from "../../../../packages/error-handler";
import redis from "./../../../../packages/libs/redis/index";
import { sendEmail } from "./SendMail/index";
import { NextFunction, Request, Response } from "express";
import prisma from "./../../../../packages/libs/prisma/index";

export const validateRegistrationData = (
  data: any,
  userType: "user" | "seller"
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { name, email, password, phone_number, country } = data;
  console.log(data);

  if (!name) {
    throw new ValidationError("Name is required");
  }
  if (!email) {
    throw new ValidationError("Email is required");
  }
  if (!password) {
    throw new ValidationError("Password is required");
  }
  if (userType === "seller" && (!phone_number || !country)) {
    throw new ValidationError(
      "user type select is required for register account; phone number and country is required"
    );
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
  email: string,
  name: string,
  template: string
) => {
  const otp = crypto.randomInt(10000, 99999).toString();

  // send email
  sendEmail(email, "Verify Email with OTP", template, { name, otp });
  console.log(otp, "otp");
  await redis.set(`otp:${email}`, otp, "EX", 300); // OTP valid for 5 minutes
  await redis.set(`otp_cooldown:${email}`, "true", "EX", 60); // Cooldown period of 1 minute
};

//Verify OTP
export const verifyOtp = async (
  email: string,
  otp: string,
  next: NextFunction
) => {
  const storedOtp = await redis.get(`otp:${email}`);

  if (!storedOtp) {
    return next(new Error("OTP expired or invalid. Please request a new one."));
  }

  const failedAttemptsKey = `otp_attempts:${email}`;
  const failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || "0");

  if (storedOtp !== otp) {
    if (failedAttempts >= 2) {
      await redis.set(`otp_lock:${email}`, "locked", "EX", 1800); // 30 minutes lock
      await redis.del(`otp:${email}`, failedAttemptsKey); // Invalidate OTP after lock

      return next(
        new Error(
          "Too many incorrect OTP attempts. Please request a new OTP. try after 30 minutes"
        )
      );
    }

    await redis.set(failedAttemptsKey, failedAttempts + 1, "EX", 300); // count resets after 5 minutes
    return next(
      new Error(
        `Incorrect OTP. Please try again. ${2 - failedAttempts} attempts left.`
      )
    );
  }

  await redis.del(`otp:${email}`, failedAttemptsKey); // OTP verified, remove it and reset attempts
};

export const handleForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
  userType: "user" | "seller"
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ValidationError("email is required");
    }

    // find in db
    const user =
      userType === "user" &&
      (await prisma.users.findUnique({ where: { email } }));
    if (!user) {
      return next(new ValidationError("No account found with this email"));
    }

    //check otp restrictions
    await checkOTPrestrictions(email, next);
    await trackOTPRequests(email, next);

    //generate and send otp
    await sendOTP(email, user.name, "forgot-password-user-mail");

    res.status(200).json({ message: "OTP sent to your email, please verify your account" });

  } catch (err) {
    return next(err);
  }
};
