export default defineEventHandler(async (event) => {
  const publisRoutes = ['/login'];

  const path = event.path;

  const isPublicRoute = publisRoutes.some((route) => path.includes(route));

  if (isPublicRoute || !path.includes('/api')) return;

  const authHeader = getHeader(event, 'authorization');

  if (!authHeader) {
    return sendRedirect(event, '/login', 302);
  }

  const token = authHeader.replace('Bearer ', '');

  // 🔐 validate token (replace with real JWT verify)
  const isValid = token === 'my-temp-token';

  if (!isValid) {
    return sendRedirect(event, '/login', 302);
  }
});
