import { loginService } from '../../services/login.service';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await loginService(event, body);
});
