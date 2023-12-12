import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "pymeManager2", // db name
  "root", // username
  "jpp--278", // password
  {
    host: "localhost",
    dialect: "mysql",
  }
);




