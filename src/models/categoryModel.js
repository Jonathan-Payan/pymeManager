// categoryModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const CategoryModel = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default CategoryModel;
