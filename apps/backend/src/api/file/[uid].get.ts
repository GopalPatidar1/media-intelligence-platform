import type { H3Event } from 'h3';
import { fetchFileByUid } from '../../services/file.service';

export default defineEventHandler(async (event: H3Event) => {
  return await fetchFileByUid(event);
});
