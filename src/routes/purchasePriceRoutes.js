// purchasePriceRoutes.js
import express from 'express';
import { addPurchasePrice, getPurchasePrices, updatePurchasePrice, deletePurchasePrice } from '../controllers/purchasePriceController.js';

const router = express.Router();

// Ruta para agregar un precio de compra
router.post('/purchase-price', async (req, res) => {
  const { productId, price } = req.body;
  await addPurchasePrice(productId, price);
  res.status(201).json({ message: 'Purchase price added successfully' });
});

// Ruta para obtener los precios de compra
router.get('/purchase-price/:productId', async (req, res) => {
  const { productId } = req.params;
  const prices = await getPurchasePrices(productId);
  res.status(200).json(prices);
});

// Ruta para actualizar un precio de compra
router.put('/purchase-price/:priceId', async (req, res) => {
  const { priceId } = req.params;
  const { newPrice } = req.body;
  await updatePurchasePrice(priceId, newPrice);
  res.status(200).json({ message: 'Purchase price updated successfully' });
});

// Ruta para eliminar un precio de compra
router.delete('/purchase-price/:priceId', async (req, res) => {
  const { priceId } = req.params;
  await deletePurchasePrice(priceId);
  res.status(200).json({ message: 'Purchase price deleted successfully' });
});

export default router;

