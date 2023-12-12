// productModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import  SupplierModel  from './supplierModel.js';
import CategoryModel from './categoryModel.js';  // Corregir el nombre del modelo de categoría

const ProductModel = sequelize.define(
  'Product',
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
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SupplierModel,
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CategoryModel, 
        key: 'id',
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default ProductModel;
