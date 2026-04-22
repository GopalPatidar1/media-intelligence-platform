import { Client } from "minio";

let minioClient: Client;

export const getMinioClient = () => {
  if (!minioClient) {
    minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT || "minio",
      port: Number(process.env.MINIO_PORT) || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ROOT_USER || "admin",
      secretKey: process.env.MINIO_ROOT_PASSWORD || "Intel@321$#@",
    });
  }

  return minioClient;
};
