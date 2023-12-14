// controllers/saleController.js
import Sale from '../models/saleModel.js'; // Asegúrate de tener el nombre correcto del modelo de venta
import SaleItem from '../models/saleItemModel.js'; // Asegúrate de tener el nombre correcto del modelo de elemento de venta
import Product from '../models/productModel.js'; // Asegúrate de importar el modelo de producto
import { printProductStock } from '../controllers/inventoryController.js'; // Importa la función para imprimir el stock


export const getSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({ include: [{ model: SaleItem, as: 'items' }] });
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting sales' });
  }
};

export const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findByPk(id, { include: [{ model: SaleItem, as: 'items' }] });
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting sale by ID' });
  }
};

//export const createSale = async (req, res) => {
 // const { body } = req;
 // try {
 //   const newSale = await Sale.create(body, { include: [{ model: SaleItem, as: 'items' }] });
 //   res.status(201).json(newSale);
//  } catch (error) {
//    console.error(error);
 //   res.status(500).json({ message: 'Error creating sale' });
 // }
//};



export const createSale = async (req, res) => {
    const { body } = req;
  
    try {
      // Verificar si hay suficiente stock para cada elemento de venta
      for (const item of body.items) {
        const currentStock = await printProductStock(item.productId);
  
        // Si no hay suficiente stock, cancelar la venta
        if (currentStock < item.quantity) {
          return res.status(400).json({ message: `No hay suficiente stock para el producto ${item.productId}` });
        }
      }
  
      // Si hay suficiente stock, proceder con la creación de la venta
      const newSale = await Sale.create(body, { include: [{ model: SaleItem, as: 'items' }] });
  
      res.status(201).json(newSale);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating sale' });
    }
  };



  

export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const sale = await Sale.findByPk(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    await sale.update(body, { include: [{ model: SaleItem, as: 'items' }] });
    res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating sale' });
  }
};

export const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findByPk(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    await sale.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting sale' });
  }
};
