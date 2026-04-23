import {
  fetchFileStatsByType,
  fetchFilesByType,
} from '../../services/file.service';

export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const query = getQuery(event);
  const { type, where } = query;
  let parseWhere: { fileName?: string } = {};
  if (typeof where === 'string') {
    parseWhere = where ? JSON.parse(where) : {};
  }
  if (type) {
    return await fetchFilesByType(type as string, parseWhere);
  }

  return await fetchFileStatsByType();
});
