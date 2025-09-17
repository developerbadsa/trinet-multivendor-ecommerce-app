import { Router, Request, Response } from "express";
import {
  userRegistration,
  verifyUser,
  loginUser,
  userForgotPassword,
  resetUserPassword,
  verifyForgotPassword,
} from "./../controller/auth.controller";

const router = Router();

// //  Register route
router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);

// Login route
router.post("/login-user", loginUser);

// forget routes
router.post("/forgot-password-user", userForgotPassword);
router.post("/reset-password-user", resetUserPassword);
router.post("/verify-forgot-password-user", verifyForgotPassword);

// health test route
router.post("/auth-test", async (req: Request, res: Response) => {
  res.status(200).json({ message: "auth running properly" });
});

// Example: Logout route
router.post("/logout", (req: Request, res: Response) => {
  // Logout logic here
  res.status(200).json({ message: "User logged out successfully" });
});

export default router;
