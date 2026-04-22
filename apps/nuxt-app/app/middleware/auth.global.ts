export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("authToken").value;
  const publicRoutes = ["/login", "/register"];

  if (!token && !publicRoutes.includes(to.path)) {
    return navigateTo("/login");
  }
  if (token && publicRoutes.includes(to.path)) {
    return navigateTo("/dashboard");
  }
});
