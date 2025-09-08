import { Request, Response, NextFunction } from "express";
import { validateRegistrationData } from "../utils/auth.helper";
import prisma from './../../../../packages/libs/prisma/index';


export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
  validateRegistrationData(req.body, "user");

  const { name , email } = req.body;

  const isExistingEmail = await prisma.users.findUnique({
    where: { email }
  });

  if(isExistingEmail){
    return next(new Error("Email already exists"));
  }



  res.send({ message: "user registration" });
}