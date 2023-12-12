// salePriceRoutes.js
import express from 'express';
import { addSalePrice, getSalePrices, updateSalePrice, deleteSalePrice } from '../controllers/salePriceController.js';

const router = express.Router();

// Ruta para agregar un precio de venta
router.post('/sale-price/', async (req, res) => {
  const { productId, price } = req.body;
  await addSalePrice(productId, price);
  res.status(201).json({ message: 'Sale price added successfully' });
});

// Ruta para obtener los precios de venta
router.get('/sale-price/:productId', async (req, res) => {
  const { productId } = req.params;
  const prices = await getSalePrices(productId);
  res.status(200).json(prices);
});

// Ruta para actualizar un precio de venta
router.put('/sale-price/:priceId', async (req, res) => {
  const { priceId } = req.params;
  const { newPrice } = req.body;
  await updateSalePrice(priceId, newPrice);
  res.status(200).json({ message: 'Sale price updated successfully' });
});

// Ruta para eliminar un precio de venta
router.delete('/sale-price/:priceId', async (req, res) => {
  const { priceId } = req.params;
  await deleteSalePrice(priceId);
  res.status(200).json({ message: 'Sale price deleted successfully' });
});

export default router;