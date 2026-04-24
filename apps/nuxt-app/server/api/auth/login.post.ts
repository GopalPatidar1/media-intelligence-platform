import { loginService } from '../../services/auth/login';
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await loginService(event, body);
});
