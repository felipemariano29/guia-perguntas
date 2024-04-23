const sequelize = require("sequelize");

const connection = new sequelize(
  "guiaperguntas",
  "root",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = connection;
