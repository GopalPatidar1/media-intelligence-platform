import { fetchFileStatsByType, fetchFilesByType } from "../../services/file.service";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { type } = query;

  if (type) {
    return await fetchFilesByType(type as string);
  }

  return await fetchFileStatsByType();
});
