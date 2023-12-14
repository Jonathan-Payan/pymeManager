import express from 'express';
import {
  getAllSalePrices,
  getSalePriceById,
  createSalePrice,
  updateSalePrice,
  deleteSalePrice,
} from '../controllers/salePriceController.js';

const router = express.Router();

// Obtener todos los precios de venta
router.get('/sale-prices', getAllSalePrices);

// Obtener un precio de venta por ID
router.get('/sale-prices/:id', getSalePriceById);

// Crear un nuevo precio de venta
router.post('/sale-prices', createSalePrice);

// Actualizar un precio de venta existente
router.put('/sale-prices/:id', updateSalePrice);

// Eliminar un precio de venta por ID
router.delete('/sale-prices/:id', deleteSalePrice);

export default router;
