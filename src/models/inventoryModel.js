// inventory.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Product from './productModel.js'; 

const Inventory = sequelize.define(
  'Inventory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Definir la asociación con el modelo Product
Inventory.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

export default Inventory;
