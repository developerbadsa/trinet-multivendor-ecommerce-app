import { Request, Response, NextFunction } from "express";
import { validateRegistrationData } from "../utils/auth.helper";
import prisma from "./../../../../packages/libs/prisma/index";
import { checkOTPrestrictions } from "../utils/auth.helper";
import { trackOTPRequests } from "./../utils/auth.helper";
import { sendOTP } from "../utils/auth.helper";

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
