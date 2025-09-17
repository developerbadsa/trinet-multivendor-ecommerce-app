import { Request, Response, NextFunction } from "express";
import { validateRegistrationData } from "../utils/auth.helper";
import prisma from "./../../../../packages/libs/prisma/index";
import {
  sendOTP,
  verifyOtp,
  trackOTPRequests,
  checkOTPrestrictions,
} from "../utils/auth.helper";
import bcrypt from "bcrypt";

// register a new user
export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRegistrationData(req.body, "user");

    const { name, email } = req.body;

    const isExistingEmail = await prisma.users.findUnique({
      where: { email },
    });

    if (isExistingEmail) {
      return next(new Error("Email already exists"));
    }
    await checkOTPrestrictions(email, next);
    await trackOTPRequests(email, next);
    await sendOTP(email, name, "user-activation-mail");

    res.status(200).send({ message: "OTP send . Please verify your email." });
  } catch (err) {
    next(err);
  }
};

// verify user with otp
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, password, name } = req.body;
    if (!email || !otp || !password || !name) {
      return next(new Error("all fields are required"));
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(new Error("Email already exists"));
    }

    //check for valid otp
    await verifyOtp(email, otp, next);
console.log("otp verified successfully");

    const hashedPassword = await bcrypt.hash(password.toString(), 10); // Hash the password

    console.log("hashedPassword", hashedPassword);

    //write to db
    const user = await prisma.users.create({
      data: { name, email, password: hashedPassword },
    });

    console.log('created user', user);

    res.status(201).send({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
};
