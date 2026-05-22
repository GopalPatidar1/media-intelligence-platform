import { Client } from 'minio';
import config from '@/config';

let minioClient: Client;

export const getMinioClient = () => {
  if (!minioClient) {
    minioClient = new Client({
      endPoint: config.minioEndpoint || 'minio',
      port: Number(config.minioPort) || 9000,
      useSSL: false,
      accessKey: config.minioRootUser,
      secretKey: config.minioRootPassword,
    });
  }

  return minioClient;
};
