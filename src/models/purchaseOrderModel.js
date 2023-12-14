// purchaseOrderModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const PurchaseOrder = sequelize.define(
  'PurchaseOrder',
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
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // Puedes agregar más estados según sea necesario
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Puede estar vacío al principio
    },
  },
  
  {
    timestamps: false,
  }
);

export default PurchaseOrder;
