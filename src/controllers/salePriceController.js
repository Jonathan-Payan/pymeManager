import SalePrice from '../models/salePriceModel.js';

// Obtener todos los precios de venta
export const getAllSalePrices = async (req, res) => {
  try {
    const salePrices = await SalePrice.findAll();
    res.status(200).json(salePrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un precio de venta por ID
export const getSalePriceById = async (req, res) => {
  const { id } = req.params;
  try {
    const salePrice = await SalePrice.findByPk(id);
    if (!salePrice) {
      res.status  (404).json({ message: 'Precio de venta no encontrado' });
      return;
    }
    res.status(200).json(salePrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo precio de venta
export const createSalePrice = async (req, res) => {
  const { price, date, productId } = req.body;
  try {
    const newSalePrice = await SalePrice.create({ price, date, productId });
    res.status(201).json(newSalePrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un precio de venta existente
export const updateSalePrice = async (req, res) => {
  const { id } = req.params;
  const { price, date, productId } = req.body;
  try {
    const salePrice = await SalePrice.findByPk(id);
    if (!salePrice) {
      res.status(404).json({ message: 'Precio de venta no encontrado' });
      return;
    }
    await salePrice.update({ price, date, productId });
    res.status(200).json(salePrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un precio de venta por ID
export const deleteSalePrice = async (req, res) => {
  const { id } = req.params;
  try {
    const salePrice = await SalePrice.findByPk(id);
    if (!salePrice) {
      res.status(404).json({ message: 'Precio de venta no encontrado' });
      return;
    }
    await salePrice.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
