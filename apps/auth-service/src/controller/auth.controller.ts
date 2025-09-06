import { Request, Response } from "express";


export const userRegistration = async (req: Request, res: Response) => {
  res.send({ message: "user registration" });
}