// controllers/saleItemController.js
import SaleItem from '../models/saleItemModel.js'; 
import Sale from '../models/saleModel.js'; 


export const getSaleItems = async (req, res) => {
  try {
    const saleItems = await SaleItem.findAll();
    res.status(200).json(saleItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting sale items' });
  }
};

export const getSaleItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const saleItem = await SaleItem.findByPk(id);
    if (!saleItem) {
      return res.status(404).json({ message: 'Sale item not found' });
    }
    res.status(200).json(saleItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting sale item by ID' });
  }
};

export const createSaleItem = async (req, res) => {
  const { body } = req;
  try {
    const newSaleItem = await SaleItem.create(body);
    res.status(201).json(newSaleItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating sale item' });
  }
};
/*
export const createSaleItem = async (req, res) => {
    const { body } = req;
    try {
      // Calcular el total para el elemento de venta
      const product = await Product.findByPk(body.productId);
      if (!product) {
        return res.status(400).json({ message: `Producto con ID ${body.productId} no encontrado` });
      }
  
      const discountedPrice = Math.max(0, product.price - body.discount);
      body.total = body.quantity * discountedPrice;
      console.log("............................................................................"+body.total);
  
      // Crear el elemento de venta
      const newSaleItem = await SaleItem.create(body);
  
      res.status(201).json(newSaleItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating sale item' });
    }
  };
*/

export const updateSaleItem = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const saleItem = await SaleItem.findByPk(id);
    if (!saleItem) {
      return res.status(404).json({ message: 'Sale item not found' });
    }
    await saleItem.update(body);
    res.status(200).json(saleItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating sale item' });
  }
};

export const deleteSaleItem = async (req, res) => {
  const { id } = req.params;
  try {
    const saleItem = await SaleItem.findByPk(id);
    if (!saleItem) {
      return res.status(404).json({ message: 'Sale item not found' });
    }
    await saleItem.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting sale item' });
  }
};
/*
export const getSaleItemsBySaleId = async (req, res) => {
  const { saleId } = req.params;
console.log("-----------------------------------         "+ saleId);
  try {
    const saleItems = await SaleItem.findAll({
      where: { saleId: saleId },
      include: [{ model: Sale, as: 'sale' }], // Asegúrate de tener el nombre correcto del alias
    });

    if (!saleItems || saleItems.length === 0) {
      return res.status(404).json({ message: 'No sale items found for the specified sale' });
    }

    res.status(200).json(saleItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting sale items by sale ID' });
  }
};
*/

export const getSaleItemsBySaleId = async (req, res) => {
  const { saleId } = req.params;

  try {
    const saleItems = await SaleItem.findAll({
      where: { saleId: saleId },
    });

    if (!saleItems || saleItems.length === 0) {
      return res.status(404).json({ message: 'No sale items found for the specified sale' });
    }

    res.status(200).json(saleItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting sale items by sale ID' });
  }
};


