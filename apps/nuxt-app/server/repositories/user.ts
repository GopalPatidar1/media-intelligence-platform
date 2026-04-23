import config from '../config';

export const fetchUserByEmail = async (email: string) => {
  const { Users } = config.sequelize.models;
  return await Users.findOne({ where: { email }, raw: true });
};
