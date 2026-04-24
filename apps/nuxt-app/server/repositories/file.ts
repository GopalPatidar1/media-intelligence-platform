import type { H3Event } from 'h3';
import { Sequelize, Op } from 'sequelize';
import config from '../config';
import { startSystem } from '../services/rabbitmq';

export const createFileRecord = async (data: {
  userId: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  size: number;
}) => {
  const { UserFile, Files } = config.sequelize.models;
  const file = await Files.create(data);

  const asset = {
    id: file.uid,
    fileUrl: data.fileUrl,
    status: 'uploaded',
  };

  startSystem(asset);
  await UserFile.create({
    userId: data.userId,
    fileId: file.uid,
  });

  return file;
};

export const getFileStatsByType = async (event: H3Event) => {
  const { Files } = config.sequelize.models;
  return await Files.findAll({
    include: [
      {
        association: 'userFile',
        attributes: [],
        where: { userId: event.context.user.uid },
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
  event: H3Event,
  type: string,
  where: { fileName?: string }
) => {
  const { Files } = config.sequelize.models;
  return await Files.findAll({
    include: [
      {
        association: 'userFile',
        attributes: [],
        where: { userId: event.context.user.uid },
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

export const deleteFileByIdRepo = async (id: string) => {
  const { Files, UserFile } = config.sequelize.models;

  await UserFile.destroy({ where: { fileId: id }, force: true });
  await Files.destroy({ where: { uid: id }, force: true });

  return { success: true };
};
