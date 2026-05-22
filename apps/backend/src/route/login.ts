import express, { Request, Response, NextFunction } from 'express';
import { loginService } from '@/services/auth/login';
import { registerService } from '@/services/auth/register';
import createHttpError from 'http-errors';

const router = express.Router();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await loginService(req, res, next);
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('authToken');
    res.clearCookie('authenticated');
    return res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    return next(
      createHttpError(500, { error: error?.message || 'Logout failed' })
    );
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await registerService(req, res, next);
};

router.get('/logout', logout);
router.post('/login', login);
router.post('/register', register);

export default router;
