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
import {
  ValidationError,
  AuthError,
} from "./../../../../packages/error-handler/index";
import jwt from "jsonwebtoken";
import { setCookie } from "./../utils/cookies/setCookie";

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

    console.log("created user", user);

    res.status(201).send({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
};

//login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ValidationError("email and password are required"));
    }

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return next(new AuthError("user does not exist"));
    }

    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      return next(new AuthError("invalid credentials, password incorrect"));
    }

    //access token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      }
    );

    //refresh token
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    //store refress and access token in httpOnly cookie
    setCookie(res, "refreshToken", refreshToken);
    setCookie(res, "accessToken", accessToken);

    res
      .status(200)
      .send({
        message: "Login successful",
        user: { id: user.id, email: user.email, name: user.name },
      });
  } catch (err) {
    next(err);
  }
};
