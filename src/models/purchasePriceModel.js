// purchasePriceModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import ProductModel from './productModel.js';

const PurchasePrice = sequelize.define(
  'PurchasePrice',
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
PurchasePrice.belongsTo(ProductModel, {
  foreignKey: 'productId',
  onDelete: 'CASCADE', // Esto eliminará los precios de compra cuando se elimine un producto
});

export default PurchasePrice;