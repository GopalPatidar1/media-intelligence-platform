import config from '@@/server/config';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fetchUserByEmail, createUser } from '@@/server/repositories/user';

const generateTokon = (
  event: any,
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

  setCookie(event, 'authToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });
  setCookie(event, 'authenticated', 'true', {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  });

  return { success: true };
};

export const registerService = async (
  event: any,
  payload: {
    email: string;
    password: string;
    name: string;
  }
) => {
  const user = await createUser(payload);

  return generateTokon(event, { uid: user.uid, email: payload.email });
};

export const loginService = async (
  event: any,
  payload: {
    email: string;
    password: string;
  }
) => {
  const userInfo = await fetchUserByEmail(payload.email);

  if (!userInfo) {
    setResponseStatus(event, 404);
    return { message: 'User Not Found' };
  }

  const pass = bcrypt.compareSync(payload.password, userInfo.password);

  if (!pass) {
    setResponseStatus(event, 401);
    return { message: 'wrong password' };
  }
  return generateTokon(event, { uid: userInfo.uid, email: userInfo.email });
};
