// inventoryModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

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
    operationType: {
      type: DataTypes.ENUM('entrada', 'salida'),
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

export default Inventory;
