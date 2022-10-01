const dotenv = require("dotenv");
dotenv.config();

const development = {
  username: process.env.CONFIG_USERNAME,
  password: process.env.CONFIG_PASSWORD,
  database: process.env.CONFIG_DATABASE,
  host: "127.0.0.1",
  dialect: "mysql"
};

const test = {
  username: "root",
  password: null,
  database: "database_development",
  host: "127.0.0.1",
  dialect: "mysql"
};

const production = {
  username: "root",
  password: null,
  database: "database_development",
  host: "127.0.0.1",
  dialect: "mysql"
};

module.exports = { development, test, production };