import { Response, NextFunction, Request } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import config from 'config';

export const jwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    req.context ??= {};
    req.context.user = { uid: decoded.uid, email: decoded.email };
  } catch {
    return next(
      createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token',
      })
    );
  }
};
