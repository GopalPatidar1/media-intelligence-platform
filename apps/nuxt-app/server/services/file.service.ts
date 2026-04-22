// server/services/file.service.js
import { getMinioClient } from '../utils/minio';
import { FILE_TYPE_MAP } from '../utils/constants';
import {
  createFileRecord,
  getFileStatsByType,
  getFilesByType,
} from '../repositories/file';
import { FileForm } from '../types/file';

const BUCKET = 'uploads';

export const fetchFileStatsByType = async () => {
  return await getFileStatsByType();
};

export const fetchFilesByType = async (type: string) => {
  return await getFilesByType(type);
};

export const uploadFileService = async (file: File, payload: FileForm) => {
  if (!file || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file' });
  }
  const fileType = FILE_TYPE_MAP[file.type];
  if (!fileType) {
    return { error: 'Invalid file type' };
  }

  const fileName = `${fileType}/${file.filename}`;
  const path = `${BUCKET}/${fileName}`;
  const size = file.data.byteLength;

  if (!payload.fileName) payload.fileName = file.filename;

  await getMinioClient().putObject(
    BUCKET,
    fileName,
    file.data,
    file.data.length,
    {
      'Content-Type': file.type || 'application/octet-stream',
    }
  );

  const userId = '60772477-4a68-4974-958f-b9506691ffcf';

  await createFileRecord({
    userId,
    fileType,
    fileUrl: path,
    size,
    ...payload,
  });

  return {
    message: 'Upload successful',
    fileName,
    url: `http://localhost:9001/${path}`,
  };
};
