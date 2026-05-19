import config from 'config';
const { Users } = config.sequelize.models;

export const fetchUserByEmail = async (email: string) => {
  return await Users.findOne({ where: { email }, raw: true });
};

export const createUser = async (payload: {
  email: string;
  password: string;
  name: string;
}) => {
  return await Users.create(payload);
};
