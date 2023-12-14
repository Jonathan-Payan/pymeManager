// inventoryController.js
import Inventory from '../models/inventoryModel.js';
import ProductModel from '../models/productModel.js';
import PurchaseOrderModel from '../models/purchaseOrderModel.js';
import { Sequelize } from 'sequelize';



const addInventoryEntry = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const entryDate = new Date();
    const product = await ProductModel.findByPk(productId);
      if (!product) {
        console.log(`Producto con ID ${productId} no encontrado`);
        return;
      }
  
      // Obtener el stock inicial del producto desde la tabla de productos
      const initialStock = product.stock;

    const currentStock = await printProductStock(productId);


    console.log('operacion in ---------------------------------- in --->    '+currentStock+','+initialStock)
    if (currentStock > initialStock) {
      return res.status(400).json({ message: 'Se sobrepasa el valor establecido de stock' });
    }



    // Crea la operación de entrada en el inventario
    const newEntry = await Inventory.create({
      productId,
      quantity,
      operationDate: entryDate, // Asigna la fecha de operación
    });

    // Imprime el stock actual del producto después de la entrada
    printProductStock(productId);

    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding inventory entry' });
  }
};

const addInventoryExit = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const exitDate = new Date();

   

    // Verifica si hay stock suficiente para la salida
    const currentStock = await printProductStock(productId);

    console.log(typeof currentStock);

    console.log('curr------------------------------------->     '+currentStock)
    console.log('operacion------------------------------------->    '+currentStock+','+Math.abs(quantity))
    if (currentStock <= Math.abs(quantity)) {
      return res.status(400).json({ message: 'No hay stock suficiente para la salida' });
    }

    // Crea la operación de salida en el inventario con cantidad negativa
    const newExit = await Inventory.create({
      productId,
      quantity: -Math.abs(quantity), // Cantidades negativas para representar una salida
      operationDate: exitDate, // Asigna la fecha de operación
    });

    // Imprime el stock actual del producto después de la salida
    printProductStock(productId);

 // Verifica si se debe generar una orden de compra antes de la salida
 await checkAndCreatePurchaseOrder(productId);

    res.status(201).json(newExit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding inventory exit' });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting inventory' });
  }
};


// Función para imprimir el stock actual del producto
export const printProductStock = async (productId) => {
    let dateThreshold;
  
    try {
      const product = await ProductModel.findByPk(productId);
      if (!product) {
        console.log(`Producto con ID ${productId} no encontrado`);
        return;
      }
  
      // Encuentra la fecha de la última operación de entrada
      dateThreshold = await Inventory.max('operationDate', {
        where: {
          productId,
          operationDate: {
            [Sequelize.Op.lte]: new Date(),
          },
        },
      });
  
      // Si no hay operaciones de entrada, establece la fecha de la última operación como la fecha actual
      dateThreshold = dateThreshold || new Date();
  
   
      const inventoryEntries = await Inventory.sum('quantity', {
        where: {
          productId,
          quantity: {
            [Sequelize.Op.gt]: 0, // Solo suma cantidades mayores a cero
          },
          operationDate: {
            [Sequelize.Op.lte]: dateThreshold,
          },
        },
      });
      
  
      const inventoryExits = await Inventory.sum('quantity', {
        where: {
          productId,
          quantity: {
            [Sequelize.Op.lt]: 0, // Cantidad negativa para representar una salida
          },
          operationDate: {
            [Sequelize.Op.lte]: dateThreshold,
          },
        },
      });
  
      console.log(`Cantidades de entradas: ${inventoryEntries}`);
      console.log(`Cantidades de salidas: ${Math.abs(inventoryExits)}`); // Tomamos el valor absoluto para las salidas
  
      const currentStock = inventoryEntries + inventoryExits; // Suma las cantidades de entrada y resta las de salida
      console.log(`Stock actual del producto ${productId}: ${currentStock}`);

      return currentStock; // Devuelve el número directamente


    } catch (error) {
      console.error(`Error al calcular e imprimir el stock del producto ${productId}:`, error);
    }
  };
  
  
  

  const checkAndCreatePurchaseOrder = async (productId) => {
    try {
      const product = await ProductModel.findByPk(productId);
      if (!product) {
        console.log(`Producto con ID ${productId} no encontrado`);
        return;
      }
  
      // Obtener el stock inicial del producto desde la tabla de productos
      const initialStock = product.stock;
  
      // Obtener el stock actual del producto utilizando la función printProductStock
      const currentStock = await printProductStock(productId);
  
      // Calcula el umbral de stock como el 30% del stock inicial
      const stockThreshold = 0.3 * initialStock;
  
      // Verifica si el stock actual está por debajo del umbral
      if (currentStock <= stockThreshold) {
        // Genera una orden de compra
        const purchaseOrder = await PurchaseOrderModel.create({
          productId,
          quantity: initialStock - currentStock, // Cantidad es la diferencia entre el stock inicial y el actual
          orderDate: new Date(), 
          status: 'pending', 
          providerId:null,
        });
        console.log(`Generada orden de compra para el producto ${productId}`);
      }
    } catch (error) {
      console.error(`Error al verificar y generar orden de compra para el producto ${productId}:`, error);
    }
  };

export { addInventoryEntry, addInventoryExit, getInventory };
