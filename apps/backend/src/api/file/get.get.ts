import type { H3Event } from 'h3';
import {
  fetchFileStatsByType,
  fetchFilesByType,
} from '../../services/file.service';

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);
  const { type, where } = query;
  let parseWhere: { fileName?: string } = {};
  if (typeof where === 'string') {
    parseWhere = where ? JSON.parse(where) : {};
  }
  if (type) {
    return await fetchFilesByType(event, type as string, parseWhere);
  }

  return await fetchFileStatsByType(event);
});
