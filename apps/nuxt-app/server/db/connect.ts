import config from "../config/index";
import { sequelize } from "./sequelize";
import initModels from "../models/initModel";

export const connectDB = async () => {
  try {
    sequelize.authenticate();
    initModels(sequelize);
    config.sequelize = sequelize;
    
    await sequelize.sync({ alter: true }); // creates tables
    console.log("✅ PostgreSQL connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
};
