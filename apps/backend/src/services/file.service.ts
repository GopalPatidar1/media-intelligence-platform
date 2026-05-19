import { H3Event } from 'h3';
import { getMinioClient } from '@@/server/utils/minio';
import { FILE_TYPE_MAP, MIME_MAP } from '@@/server/utils/constants';
import {
  createFileRecord,
  getFileStatsByType,
  getFilesByType,
  deleteFileByIdRepo,
  getFileByUid,
  updateFileRecord,
} from '../repositories/file';
import { FileForm } from '@@/server/types/file';

const BUCKET = 'uploads';

export const fetchFileStatsByType = async (event: H3Event) => {
  return await getFileStatsByType(event);
};

export const fetchFileByUid = async (event: H3Event) => {
  const data = await getFileByUid(event);

  const stream = await getMinioClient().getObject(
    BUCKET,
    data.fileUrl.replace(`${BUCKET}/`, '')
  );
  const typeInfo = data?.fileType ? MIME_MAP[data.fileType] : undefined;

  if (!data || !typeInfo) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File type not found',
    });
  }
  setHeader(event, 'Content-Type', typeInfo.mime);
  setHeader(
    event,
    'Content-Disposition',
    `inline; filename="${data.fileName}.${typeInfo.ext}"`
  );

  return sendStream(event, stream);
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

const validateFileType = async (file: any, payload: FileForm) => {
  if (!file || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file' });
  }
  const fileType = FILE_TYPE_MAP[file.type];
  if (!fileType) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file type' });
  }

  const fileName = `${fileType}/${file.filename}`;
  const path = `${BUCKET}/${fileName}`;
  const size = file.data.byteLength;

  if (!payload.fileName) payload.fileName = file.filename;
  try {
    await getMinioClient().putObject(
      BUCKET,
      fileName,
      file.data,
      file.data.length,
      {
        'Content-Type': file.type || 'application/octet-stream',
      }
    );
  } catch {
    throw createError({ statusCode: 500, statusMessage: 'File upload failed' });
  }

  return { fileType, fileName, path, size };
};

export const uploadFileService = async (
  file: any,
  payload: FileForm,
  event: H3Event
) => {
  const { fileType, fileName, path, size } = await validateFileType(
    file,
    payload
  );

  await createFileRecord({
    userId: event.context.user.uid,
    fileType,
    fileUrl: path,
    size,
    ...payload,
  });

  return {
    statusMessage: 'Upload successful',
    fileName,
    url: `http://localhost:9001/${path}`,
  };
};

export const updateFileByUid = async (
  event: H3Event,
  file: any,
  payload: FileForm
) => {
  const { fileType, fileName, path, size } = await validateFileType(
    file,
    payload
  );

  await updateFileRecord(event, {
    userId: event.context.user.uid,
    fileType,
    fileUrl: path,
    size,
    ...payload,
  });

  return {
    statusMessage: 'File updated successfully',
    fileName,
    url: `http://localhost:9001/${path}`,
  };
};
