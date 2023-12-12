// user.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { hashPassword } from "../utils/password-utils.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
      },
    },
  }
);





