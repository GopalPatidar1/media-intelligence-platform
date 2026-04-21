import { getMinioClient } from "../../utils/minio";
import { defineEventHandler, readMultipartFormData } from "h3";

const BUCKET = "uploads";

export default defineEventHandler(async (event) => {
  const minioClient = getMinioClient();
  const folderName = "image/";

  const objects: string[] = [];

  const stream = minioClient.listObjects(BUCKET, folderName, true);

  await new Promise((resolve) => {
    stream.on("data", (obj: any) => objects.push(obj.name));
    stream.on("end", resolve);
  });

  if (objects.length > 0) {
    await minioClient.removeObjects(BUCKET, objects);
  }

  return { message: "Folder Deleted successful", folderName };
});
