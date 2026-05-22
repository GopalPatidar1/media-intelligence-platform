import config from '@/config/index';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Response, NextFunction, Request } from 'express';
import { fetchUserByEmail, createUser } from '@/repositories/user';

const generateTokon = (
  res: Response,
  userInfo: { email: string; uid: string }
) => {
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
    maxAge: 60 * 60,
  });

  res.cookie('authenticated', {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });

  return res.sendStatus(200);
};

export const registerService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req);
    return generateTokon(res, { uid: user.uid, email: req.body.email });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    return next(error);
  }
};

export const loginService = async (
  res: Response,
  payload: {
    email: string;
    password: string;
  }
) => {
  const userInfo = await fetchUserByEmail(payload.email);

  if (!userInfo) {
    return res.status(404).json({ message: 'User Not Found' });
  }

  const pass = bcrypt.compareSync(payload.password, userInfo.password);

  if (!pass) {
    return res.status(401).json({ message: 'wrong password' });
  }
  return generateTokon(res, { uid: userInfo.uid, email: userInfo.email });
};
