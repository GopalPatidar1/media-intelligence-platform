import config from "../config/index";
import { Sequelize } from "sequelize";
import initModels from "../models/initModel";

export const connectDB = async () => {
  config.sequelize = new Sequelize("media_intelligence", "postgres", "mindfire", {
    host: "10.63.25.105",
    port: 5432,
    ssl: false,
    dialect: "postgres",
    logging: false,
  });

  try {
    await config.sequelize.authenticate();
    initModels(config.sequelize);
    await config.sequelize.sync({ alter: true });
    console.log("✅ PostgreSQL connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
};
