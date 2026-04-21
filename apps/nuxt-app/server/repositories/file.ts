// server/repositories/file.repository.js
import { Sequelize } from "sequelize";
import config from "../config";

const { UserFile, Files } = config.sequelize.models;

export const createFileRecord = async (data: { userId: String; fileName: string; fileType: string; fileUrl: string; size: number }) => {
  const file = await Files.create(data);

  await UserFile.create({
    userId: data.userId,
    fileId: file.uid,
  });

  return file;
};

export const getFileStatsByType = async () => {
  return await Files.findAll({
    attributes: [
      "fileType",
      [Sequelize.fn("COUNT", Sequelize.col("file_type")), "count"],
      [Sequelize.fn("MAX", Sequelize.col("created_at")), "createdAt"],
      [Sequelize.fn("SUM", Sequelize.col("size")), "size"],
    ],
    group: ["fileType"],
  });
};

export const getFilesByType = async (type: string) => {
  console.log("🚀 ~ getFilesByType ~ type:", type)
  return await Files.findAll({
    where: {
      fileType: type,
    },
    order: [["createdAt", "DESC"]],
  });
};
