import type { H3Event } from 'h3';
import { getMinioClient } from '@@/server/utils/minio';
import { FILE_TYPE_MAP } from '@@/server/utils/constants';
import {
  createFileRecord,
  getFileStatsByType,
  getFilesByType,
  deleteFileByIdRepo,
} from '../repositories/file';
import { FileForm } from '@@/server/types/file';

const BUCKET = 'uploads';

export const fetchFileStatsByType = async (event: H3Event) => {
  return await getFileStatsByType(event);
};

export const fetchFilesByType = async (
  event: H3Event,
  type: string,
  where: { fileName?: string }
) => {
  return await getFilesByType(event, type, where);
};

export const deleteFileById = async (id: string) => {
  return await deleteFileByIdRepo(id);
};

export const uploadFileService = async (
  file: any,
  payload: FileForm,
  event: H3Event
) => {
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

  await createFileRecord({
    userId: event.context.user.uid,
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
