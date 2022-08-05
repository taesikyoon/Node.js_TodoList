require("dotenv").config();

const development = {
  username: process.env.DB_ID,
  password: process.env.DB_PW,
  database: "database_development",
  host: process.env.DB_HOST,
  dialect: "mysql",
};

const test = {
  username: process.env.DB_ID,
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: process.env.DB_ID,
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
};
module.exports = { production, test, development };
