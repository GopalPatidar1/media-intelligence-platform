import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("media_intelligence", "postgres", "mindfire", {
  host: "10.249.138.105",
  port: 5432,
  ssl: false,
  dialect: "postgres",
  logging: false,
});
