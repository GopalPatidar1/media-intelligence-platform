import { getMinioClient } from "../../utils/minio";
import { defineEventHandler, readMultipartFormData } from "h3";

const BUCKET = "uploads";

export default defineEventHandler(async (event) => {
  const folderName = "image/";

  await getMinioClient().putObject(BUCKET, folderName, "");
  return {
    message: "Folder Created successful",
    folderName,
    url: `http://localhost:9001/${BUCKET}/${folderName}`,
  };
});
