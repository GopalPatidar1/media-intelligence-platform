const config = {
  appName: "Media Intelligence",
  env: process.env.NODE_ENV || "development",

  db: {
    name: "media_intelligence",
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
  },

  sequelize: null as any,
};

export default config;
