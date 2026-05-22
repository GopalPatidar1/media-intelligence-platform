import config from '@/config/index';
import { Sequelize } from 'sequelize';
import initModels from '@/models/initModel';

export const connectDB = async () => {
  if (!config.db || !config.db.name || !config.db.user || !config.db.password) {
    throw Error('DB config is missing in environment variables');
  }

  config.sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
      host: '10.132.12.105',
      port: 5432,
      ssl: false,
      dialect: 'postgres',
      logging: false,
    }
  );

  try {
    await config.sequelize.authenticate();
    initModels(config.sequelize);
    // await config.sequelize.sync({ alter: true });
    const { bootstrapRabbit } = await import('@/services/rabbitmq');
    await bootstrapRabbit();
    console.log('✅ PostgreSQL connected');
  } catch (error) {
    console.error('❌ DB connection failed:', error);
  }
};
