// import crypto from "crypto";
import { ValidationError } from "../../../../packages/error-handler";

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

export const checkOTPrestrictions = (otp: string) => {};

export const generateOTP = (length: number = 6): string => {
  const digits = "0123456789";
  let otp = "";
};
