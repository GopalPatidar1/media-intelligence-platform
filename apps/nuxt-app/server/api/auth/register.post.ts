import { registerService } from '@@/server/services/auth/register';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await registerService(event, body);
});
