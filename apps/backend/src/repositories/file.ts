import { Sequelize, Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import config from '@/config';
import { startSystem } from '@/services/rabbitmq';

export const createFileRecord = async (data: {
  userId: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  size: number;
}) => {
  const { UserFile, Files, FileVersions } = config.sequelize.models;
  const file = await Files.create({ ...data, version: 1 });

  const asset = {
    id: file.uid,
    fileUrl: data.fileUrl,
    status: 'uploaded',
  };

  startSystem(asset);
  await FileVersions.create({
    fileId: file.uid,
    ...data,
  });
  await UserFile.create({
    userId: data.userId,
    fileId: file.uid,
  });

  return file;
};

export const updateFileRecord = async (
  req: Request,
  data: {
    userId: string;
    fileName: string;
    fileType: string;
    fileUrl: string;
    size: number;
  },
  next: NextFunction
) => {
  const { id } = req.params!;
  const { Files, FileVersions } = config.sequelize.models;

  const file = await Files.findOne({
    attributes: [
      ['uid', 'fileId'],
      'fileUrl',
      'fileName',
      'fileType',
      'size',
      'status',
      'department',
      'version',
    ],
    where: { uid: id },
    raw: true,
  });

  if (!file)
    return next(
      createError(404, { statusCode: 404, statusMessage: 'File not found' })
    );

  await Files.update(
    { ...data, version: file.version + 1 },
    { where: { uid: id } }
  );

  const asset = {
    id: file.uid,
    fileUrl: data.fileUrl,
    status: 'uploaded',
  };

  startSystem(asset);
  await FileVersions.create({ ...file, userId: data.userId });

  return file;
};

export const getFileStatsByType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Files } = config.sequelize.models;
  if (!req.context || !req.context.user || !req.context.user.uid) {
    return next(
      createError(401, { statusCode: 401, statusMessage: 'Unauthorized' })
    );
  }

  return await Files.findAll({
    include: [
      {
        association: 'userFile',
        attributes: [],
        where: { userId: req.context.user.uid },
      },
    ],
    attributes: [
      'fileType',
      [Sequelize.fn('COUNT', Sequelize.col('file_type')), 'count'],
      [Sequelize.fn('MAX', Sequelize.col('Files.created_at')), 'createdAt'],
      [Sequelize.fn('SUM', Sequelize.col('size')), 'size'],
    ],
    group: ['fileType'],
    raw: true,
    nest: true,
  });
};

export const getFilesByType = async (
  req: Request,
  type: string,
  where: { fileName?: string }
) => {
  const { Files } = config.sequelize.models;
  if (!req.context || !req.context.user || !req.context.user.uid) return false;

  return await Files.findAll({
    include: [
      {
        association: 'userFile',
        attributes: [],
        where: { userId: req.context.user.uid },
      },
    ],
    where: {
      fileType: type,
      ...(where.fileName
        ? { fileName: { [Op.iLike]: `%${where.fileName}%` } }
        : {}),
    },
    order: [['createdAt', 'DESC']],
  });
};

export const getFileByUid = async (req: Request) => {
  const { uid } = req.params!;
  const { Files } = config.sequelize.models;
  if (!req.context || !req.context.user || !req.context.user.uid) return false;

  return await Files.findOne({
    include: [
      {
        association: 'userFile',
        attributes: [],
        where: { userId: req.context.user.uid },
      },
    ],
    where: { uid: uid },
    raw: true,
    nest: true,
  });
};

export const deleteFileByIdRepo = async (id: string) => {
  const { Files, UserFile } = config.sequelize.models;

  await UserFile.destroy({ where: { fileId: id }, force: true });
  await Files.destroy({ where: { uid: id }, force: true });

  return { success: true };
};
