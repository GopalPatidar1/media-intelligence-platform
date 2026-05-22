export const config = {
  appName: 'Media Intelligence',
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,

  rabbitmqUser: process.env.RABBITMQ_USER,
  rabbitmqPass: process.env.RABBITMQ_PASS,
  minioEndpoint: process.env.MINIO_ENDPOINT,
  minioPort: process.env.MINIO_PORT,
  minioRootUser: process.env.MINIO_ROOT_USER,
  minioRootPassword: process.env.MINIO_ROOT_PASSWORD,

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
