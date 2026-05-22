import { getMinioClient } from '../utils/minio';
import { FILE_TYPE_MAP, MIME_MAP } from '../utils/constants';
import {
  createFileRecord,
  getFileStatsByType,
  getFilesByType,
  deleteFileByIdRepo,
  getFileByUid,
  updateFileRecord,
} from '../repositories/file';
import { FileForm } from '../types/file';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';

const BUCKET = 'uploads';

export const fetchFileStatsByType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return await getFileStatsByType(req, res, next);
};

export const fetchFileByUid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await getFileByUid(req);

  const stream = await getMinioClient().getObject(
    BUCKET,
    data.fileUrl.replace(`${BUCKET}/`, '')
  );
  const typeInfo = data?.fileType ? MIME_MAP[data.fileType] : undefined;

  if (!data || !typeInfo) {
    return next(
      createError({
        statusCode: 400,
        statusMessage: 'File type not found',
      })
    );
  }
  res.setHeader('Content-Type', typeInfo.mime);
  res.setHeader(
    'Content-Disposition',
    `inline; filename="${data.fileName}.${typeInfo.ext}"`
  );
  stream.pipe(res);
};

export const fetchFilesByType = async (
  req: Request,
  type: string,
  where: { fileName?: string }
) => {
  return await getFilesByType(req, type, where);
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
  req: Request
) => {
  const { fileType, fileName, path, size } = await validateFileType(
    file,
    payload
  );

  if (!req.context || !req.context.user || !req.context.user.uid) return false;

  await createFileRecord({
    userId: req.context.user.uid,
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
  req: Request,
  file: any,
  payload: FileForm,
  next: NextFunction
) => {
  const { fileType, fileName, path, size } = await validateFileType(
    file,
    payload
  );
  if (!req.context || !req.context.user || !req.context.user.uid) return false;

  await updateFileRecord(
    req,
    {
      userId: req.context.user.uid,
      fileType,
      fileUrl: path,
      size,
      ...payload,
    },
    next
  );

  return {
    statusMessage: 'File updated successfully',
    fileName,
    url: `http://localhost:9001/${path}`,
  };
};
