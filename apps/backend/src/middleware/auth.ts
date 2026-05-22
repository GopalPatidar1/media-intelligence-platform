import jwt from 'jsonwebtoken';
import config from '@/config';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export default async (req: Request, res: Response, next: NextFunction) => {
  const publisRoutes = ['/login', '/register'];

  const path = req.path;

  const isPublicRoute = publisRoutes.some((route) => path.includes(route));

  if (isPublicRoute || !path.includes('/api')) return;

  const token = req.cookies?.authToken;

  if (!token || !config.jwtSecret) {
    return { success: false, message: 'Invalid token' };
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      uid: string;
      email: string;
    };

    req.context = req.context || {};

    req.context.user = { uid: decoded.uid, email: decoded.email };
    return next();
  } catch {
    return next(
      createHttpError(401, {
        statusMessage: 'Invalid or expired token',
      })
    );
  }
};
