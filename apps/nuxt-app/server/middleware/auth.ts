import jwt from 'jsonwebtoken';
import config from '../config';

export default defineEventHandler(async (event) => {
  const publisRoutes = ['/login', '/register'];
  const path = event.path;

  const isPublicRoute = publisRoutes.some((route) => path.includes(route));

  if (isPublicRoute || !path.includes('/api')) return;

  const token = getCookie(event, 'authToken');

  if (!token || !config.jwtSecret) {
    return { success: false, message: 'Invalid token' };
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      uid: string;
      email: string;
    };

    event.context.user = { uid: decoded.uid, email: decoded.email };
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    });
  }
});
