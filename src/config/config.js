require("dotenv").config();
const env = process.env;

const development = {
  username: env.SEQUELIZE_USERNAME,
  password: env.SEQUELIZE_PASSWORD,
  database: env.SEQUELIZE_DATABASE,
  host: env.SEQUELIZE_HOST,
  dialect: env.SEQUELIZE_DIALECT,
  port: env.SEQUELIZE_PORT,
};

const test = {
  username: env.SEQUELIZE_USERNAME,
  password: env.SEQUELIZE_PASSWORD,
  database: env.SEQUELIZE_DATABASE,
  host: env.SEQUELIZE_HOST,
  dialect: env.SEQUELIZE_DIALECT,
  port: env.SEQUELIZE_PORT,
};
const production = {
  username: env.SEQUELIZE_USERNAME,
  password: env.SEQUELIZE_PASSWORD,
  database: env.SEQUELIZE_DATABASE,
  host: env.SEQUELIZE_HOST,
  dialect: env.SEQUELIZE_DIALECT,
  port: env.SEQUELIZE_PORT,
};

module.exports = { development, production, test };
