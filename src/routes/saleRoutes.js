// routes/saleRoutes.js
import express from 'express';
import {
  getSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
} from '../controllers/saleController.js'; // Asegúrate de tener los nombres correctos de los controladores

const router = express.Router();

router.get('/sales/', getSales);
router.get('/sales/:id', getSaleById);
router.post('/sales/', createSale);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);

export default router;
