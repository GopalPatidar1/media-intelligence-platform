import { getFileStatsByType, fetchFilesByType } from "../../services/file.service";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  console.log("🚀 ~ query:", query)
  const { type } = query;

  if (type) {
    return await fetchFilesByType(type as string);
  }

  return await getFileStatsByType();
});
