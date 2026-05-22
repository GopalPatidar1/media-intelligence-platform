export const config = {
  appName: 'Media Intelligence',
  env: process.env.NODE_ENV || 'development',
  jwtSecret:
    process.env.JWT_SECRET ||
    '59bfdcbcace801a9a49c2cbf09c80d7c84653fa7de400daa56d3d632b9f7686a',

  rabbitmqUser: process.env.RABBITMQ_USER || 'admin',
  rabbitmqPass: process.env.RABBITMQ_PASS || 'password',

  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
  },

  sequelize: null as any,
};

export default config;
