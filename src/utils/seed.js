import { sequelize } from '../config/database.js';
import ProductModel from '../models/productModel.js';
import PurchasePriceModel from '../models/purchasePriceModel.js';
import SalePriceModel from '../models/salePriceModel.js';
import SupplierModel from '../models/supplierModel.js';
import CategoryModel from '../models/categoryModel.js';
import InventoryModel from '../models/inventoryModel.js';
import CustomerModel from '../models/customerModel.js';


const seedDatabase = async () => {
  try {
    // Elimina todos los registros existentes en las tablas
    await InventoryModel.destroy({ where: {} });
    await PurchasePriceModel.destroy({ where: {} });
    await SalePriceModel.destroy({ where: {} });
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

    const customer1 = await CustomerModel.create({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '123456789',
      address: 'Calle Principal 123',
    });
    
    const customer2 = await CustomerModel.create({
      name: 'María González',
      email: 'maria@example.com',
      phone: '987654321',
      address: 'Avenida Secundaria 456',
    });
    
    const customer3 = await CustomerModel.create({
      name: 'Carlos López',
      email: 'carlos@example.com',
      phone: '555555555',
      address: 'Plaza Central 789',
    });
    

    // Crea categorías de ejemplo
    const category1 = await CategoryModel.create({ name: 'Alimentos y bebidas' });
    const category2 = await CategoryModel.create({ name: 'Electrónica y tecnología' });
    const category3 = await CategoryModel.create({ name: 'Ropa y moda' });
    const category4 = await CategoryModel.create({ name: 'Productos para el hogar' });
    const category5 = await CategoryModel.create({ name: 'Salud y belleza' });
    const category6 = await CategoryModel.create({ name: 'Electrodomésticos' });
    const category7 = await CategoryModel.create({ name: 'Juguetes y entretenimiento' });
    const category8 = await CategoryModel.create({ name: 'Construcción y ferretería' });
    const category9 = await CategoryModel.create({ name: 'Automóviles y accesorios' });
    const category10 = await CategoryModel.create({ name: 'Deportes y aire libre' });
    const category11 = await CategoryModel.create({ name: 'Libros y medios' });
    const category12 = await CategoryModel.create({ name: 'Productos para oficina' });
    const category13 = await CategoryModel.create({ name: 'Joyería y relojes' });
    const category14 = await CategoryModel.create({ name: 'Productos para mascotas' });
    const category15 = await CategoryModel.create({ name: 'Productos de limpieza' });

    

    // Crea productos de ejemplo asociados a proveedores y categorías
    const product1 = await ProductModel.create({
      name: 'Producto 1',
      stock: 10,
      supplierId: supplier1.id,
      categoryId: category1.id,
      weight: 1.5,
      expirationDate: '2023-12-31',
      image: 'https://definicion.de/wp-content/uploads/2009/06/producto.png',
      description: 'Descripción del producto 1',
    });

    const product2 = await ProductModel.create({
      name: 'Producto 2',
      stock: 20,
      supplierId: supplier2.id,
      categoryId: category2.id,
      weight: 2.0,
      expirationDate: '2023-11-30',
      image: 'https://definicion.de/wp-content/uploads/2009/06/producto.png',
      description: 'Descripción del producto 2',
    });

    // Agrega precios de compra y venta para productos específicos
    const purchasePrice1 = await PurchasePriceModel.create({
      productId: product1.id,
      price: 10.99, // Precio de compra para el producto 1
      startDate: '2023-01-01', // Fecha de inicio
      endDate: '2023-12-31', // Fecha de fin
    });

    const salePrice1 = await SalePriceModel.create({
      productId: product1.id,
      price: 19.99, // Precio de venta para el producto 1
      startDate: '2023-01-01', // Fecha de inicio
      endDate: '2023-12-31', // Fecha de fin
    });

    const purchasePrice2 = await PurchasePriceModel.create({
      productId: product2.id,
      price: 15.99, // Precio de compra para el producto 2
      startDate: '2023-01-01', // Fecha de inicio
      endDate: '2023-12-31', // Fecha de fin
    });

    const salePrice2 = await SalePriceModel.create({
      productId: product2.id,
      price: 29.99, // Precio de venta para el producto 2
      startDate: '2023-01-01', // Fecha de inicio
      endDate: '2023-12-31', // Fecha de fin
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
