import express, { Request, Response, NextFunction } from 'express';
import { loginService } from '../services/auth/login';
import { registerService } from '../services/auth/register';

const router = express.Router();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await loginService(req, res, next);
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('authToken');
  res.clearCookie('authenticated');
  res.sendStatus(200);
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await registerService(req, res, next);
};

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);

export default router;
