// saleModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Customer from './customerModel.js'; // Asegúrate de importar el modelo de cliente
import SaleItem from './saleItemModel.js'; // Asegúrate de importar el modelo de elementos de venta

const Sale = sequelize.define(
  'Sale',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    customerNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      

  },
  {
    timestamps: false,
  }
);

Sale.belongsTo(Customer, { foreignKey: 'customerId' });

Sale.hasMany(SaleItem, { as: 'items', foreignKey: 'saleId' });

export default Sale;
