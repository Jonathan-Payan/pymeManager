// inventory.model.js
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
    entryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    exitDate: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
  },
  {
    timestamps: false,
  }
);

export default Inventory;
