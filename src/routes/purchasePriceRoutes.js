import express from 'express';
import {
  createPurchasePriceForProduct,
  deletePurchasePrice, 
  getAllPurchasePrices,
  getAllPurchasePricesForProduct,
  getLatestPurchasePriceForProduct,
  updatePurchasePrice
} from '../controllers/purchasePriceController.js';

const router = express.Router();

// Obtener todos los precios de compra
router.get('/purchase-prices', getAllPurchasePrices);

router.post('/purchase-prices/:productId', createPurchasePriceForProduct);


// Actualizar un precio de compra existente
router.put('/purchase-prices/:id', updatePurchasePrice);

// Eliminar un precio de compra por ID
router.delete('/purchase-prices/:id', deletePurchasePrice);

// Obtener todos los precios de compra para un producto específico
router.get('/purchase-prices/:productId', getAllPurchasePricesForProduct);

// Obtener el precio de compra más reciente para un producto específico
router.get('/latest-purchase-price/:productId', getLatestPurchasePriceForProduct);


export default router;
