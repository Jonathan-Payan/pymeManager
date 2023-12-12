import { Router } from 'express';
import {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
  getSupplier,
} from '../controllers/supplierController.js';

const router = Router();

// Rutas
router.post('/suppliers', createSupplier);
router.get('/suppliers', getSuppliers);
router.get('/suppliers/:id', getSupplier);
router.put('/suppliers/:id', updateSupplier);
router.delete('/suppliers/:id', deleteSupplier);

export default router;
