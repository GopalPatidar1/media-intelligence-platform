export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('authenticated').value;
  const publicRoutes = ['/login', '/register'];

  if (!token && !publicRoutes.includes(to.path)) {
    return navigateTo('/login');
  }
  if (token && publicRoutes.includes(to.path)) {
    return navigateTo('/dashboard');
  }
});
