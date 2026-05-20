export const config = {
  appName: 'Media Intelligence',
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,

  rabbitmqUser: process.env.RABBITMQ_USER || "admin",
  rabbitmqPass: process.env.RABBITMQ_PASS || "password",

  db: {
    name: 'media_intelligence',
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
  },

  sequelize: null as any,
};

export default config;
