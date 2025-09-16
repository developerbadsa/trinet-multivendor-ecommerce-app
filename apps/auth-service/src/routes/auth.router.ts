import { Router, Request, Response } from 'express';
import { userRegistration } from './../controller/auth.controller';

const router = Router();

// //  Register route
router.post('/user-registration', userRegistration);

// Example: Login route
router.post('/login', async (req: Request, res: Response) => {
  // Authentication logic here
  res.status(200).json({ message: 'User logged in successfully' });
});


// health test route
router.post('/auth-test', async (req: Request, res: Response) => {
  
  res.status(200).json({ message: 'auth running properly' });
});

// Example: Logout route
router.post('/logout', (req: Request, res: Response) => {
  // Logout logic here
  res.status(200).json({ message: 'User logged out successfully' });
});

export default router;