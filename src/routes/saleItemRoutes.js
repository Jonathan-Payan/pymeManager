// routes/saleItemRoutes.js
import express from 'express';

import {
  getSaleItems,
  getSaleItemById,
  createSaleItem,
  updateSaleItem,
  deleteSaleItem,
  getSaleItemsBySaleId, // Importa el nuevo controlador
} from '../controllers/saleItemController.js'; // Asegúrate de tener los nombres correctos de los controladores

const router = express.Router();

router.get('/sale-item/', getSaleItems);
router.get('/sale-item/:id', getSaleItemById);
router.get('/sale-items/:saleId', getSaleItemsBySaleId); // Nueva ruta para obtener elementos de venta por ID de venta
router.post('/sale-item/', createSaleItem);
router.put('/sale-item/:id', updateSaleItem);
router.delete('/sale-item/:id', deleteSaleItem);

export default router;
