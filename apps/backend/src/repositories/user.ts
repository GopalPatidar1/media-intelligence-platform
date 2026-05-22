import config from '../config/index';
import { Request } from 'express';
const { Users } = config.sequelize.models;

export const fetchUserByEmail = async (email: string) => {
  return await Users.findOne({ where: { email }, raw: true });
};

export const createUser = async (req: Request) => {
  const payload: any = req.body;
  return await Users.create(payload);
};
