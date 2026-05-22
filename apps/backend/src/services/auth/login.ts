import config from '@/config/index';
import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { fetchUserByEmail } from '@/repositories/user';
import createHttpError from 'http-errors';

export const loginService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: any = req.body;
  const userInfo = await fetchUserByEmail(payload.email);

  if (!userInfo) {
    return next(createHttpError(404, { message: 'User Not Found' }));
  }

  const pass = bcrypt.compareSync(payload.password, userInfo.password);

  if (!pass) {
    return next(createHttpError(401, { message: 'Wrong password' }));
  }
  const secret = config.jwtSecret;

  if (!secret) {
    throw new Error('JWT secret is not configured');
  }

  const token = jsonwebtoken.sign(
    { email: userInfo.email, uid: userInfo.uid },
    secret,
    { algorithm: 'HS256', expiresIn: '1h' }
  );

  res.cookie('authToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 1000,
  });

  res.cookie('authenticated', true, {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({ success: true });
};
