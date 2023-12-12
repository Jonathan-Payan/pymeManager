// seed.js
import { sequelize } from '../config/database.js';
import ProductModel from '../models/productModel.js';
import SupplierModel from '../models/supplierModel.js';
import CategoryModel from '../models/categoryModel.js';
import InventoryModel from '../models/inventoryModel.js';

const seedDatabase = async () => {
  try {
    // Elimina todos los registros existentes en las tablas
    await InventoryModel.destroy({ where: {} });
    await ProductModel.destroy({ where: {} });
    await SupplierModel.destroy({ where: {} });
    await CategoryModel.destroy({ where: {} });

    // Crea proveedores de ejemplo
    const supplier1 = await SupplierModel.create({
      name: 'Proveedor 1',
      address: 'Dirección 1',
      phone: '123-456-7890',
      email: 'proveedor1@example.com',
      website: 'http://proveedor1.com',
      contact_name: 'Contacto 1',
      contact_phone: '987-654-3210',
      contact_email: 'contacto1@example.com',
    });

    const supplier2 = await SupplierModel.create({
      name: 'Proveedor 2',
      address: 'Dirección 2',
      phone: '987-654-3210',
      email: 'proveedor2@example.com',
      website: 'http://proveedor2.com',
      contact_name: 'Contacto 2',
      contact_phone: '123-456-7890',
      contact_email: 'contacto2@example.com',
    });

    // Crea categorías de ejemplo
    const category1 = await CategoryModel.create({ name: 'Electrónicos' });
    const category2 = await CategoryModel.create({ name: 'Ropa' });

    // Crea productos de ejemplo asociados a proveedores y categorías
    const product1 = await ProductModel.create({
      name: 'Producto 1',
      stock: 10,
      supplierId: supplier1.id,
      categoryId: category1.id,
      weight: 1.5,
      expirationDate: '2023-12-31',
      image: 'product1.jpg',
      description: 'Descripción del producto 1',
    });

    const product2 = await ProductModel.create({
      name: 'Producto 2',
      stock: 20,
      supplierId: supplier2.id,
      categoryId: category2.id,
      weight: 2.0,
      expirationDate: '2023-11-30',
      image: 'product2.jpg',
      description: 'Descripción del producto 2',
    });

    // Agrega operaciones de entrada y salida en el inventario
await InventoryModel.bulkCreate([
  {
    productId: product1.id,
    quantity: 5,
    operationDate: sequelize.literal('CURRENT_TIMESTAMP'), // Fecha de operación
  },
  {
    productId: product2.id,
    quantity: 10,
    operationDate: sequelize.literal('CURRENT_TIMESTAMP'), // Fecha de operación
  },
  {
    productId: product1.id,
    quantity: -3, // Cantidades negativas para representar una salida
    operationDate: sequelize.literal('CURRENT_TIMESTAMP'), // Fecha de operación
  },
  // Agrega más operaciones según sea necesario
]);


    console.log('Datos de prueba generados con éxito.');

    // Cierra la conexión a la base de datos
    await sequelize.close();
  } catch (error) {
    console.error('Error generando datos de prueba:', error.message);
  }
};

seedDatabase();
