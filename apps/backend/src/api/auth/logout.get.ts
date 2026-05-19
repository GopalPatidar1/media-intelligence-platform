export default defineEventHandler(async (event) => {
  deleteCookie(event, 'authToken');
  deleteCookie(event, 'authenticated');
  return { success: true };
});
