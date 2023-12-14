import PurchasePrice from '../models/purchasePriceModel.js';

// Obtener todos los precios de compra
export const getAllPurchasePrices = async (req, res) => {
  try {
    const purchasePrices = await PurchasePrice.findAll();
    res.status(200).json(purchasePrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPurchasePricesForProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const purchasePrices = await PurchasePrice.findAll({ where: { productId } });
    res.status(200).json(purchasePrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener el precio de compra más reciente para un producto específico
export const getLatestPurchasePriceForProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const latestPurchasePrice = await PurchasePrice.findOne({
      where: { productId },
      order: [['date', 'DESC']],
    });
    res.status(200).json(latestPurchasePrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo precio de compra para un producto específico
export const createPurchasePriceForProduct = async (req, res) => {
  const { price, date } = req.body;
  const { productId } = req.params;
  try {
    const newPurchasePrice = await PurchasePrice.create({ price, date, productId });
    res.status(201).json(newPurchasePrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un precio de compra existente
export const updatePurchasePrice = async (req, res) => {
  const { id } = req.params;
  const { price, date, productId } = req.body;
  try {
    const purchasePrice = await PurchasePrice.findByPk(id);
    if (!purchasePrice) {
      res.status(404).json({ message: 'Precio de compra no encontrado' });
      return;
    }
    await purchasePrice.update({ price, date, productId });
    res.status(200).json(purchasePrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un precio de compra por ID
export const deletePurchasePrice = async (req, res) => {
  const { id } = req.params;
  try {
    const purchasePrice = await PurchasePrice.findByPk(id);
    if (!purchasePrice) {
      res.status(404).json({ message: 'Precio de compra no encontrado' });
      return;
    }
    await purchasePrice.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
