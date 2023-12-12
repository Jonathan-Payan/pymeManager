import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./userModel.js"; 

export const Contact = sequelize.define(
  "contact",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    cellphone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User, 
        key: "id",  
      },
    },
  },
  {
    timestamps: false,
  }
);



