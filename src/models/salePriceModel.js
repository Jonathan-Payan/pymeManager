// salePriceModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import ProductModel from './productModel.js';

const SalePrice = sequelize.define(
  'SalePrice',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

// Agrega la relación con el modelo de productos
SalePrice.belongsTo(ProductModel, {
  foreignKey: 'productId',
  onDelete: 'CASCADE', // Esto eliminará los precios de venta cuando se elimine un producto
});

export default SalePrice;