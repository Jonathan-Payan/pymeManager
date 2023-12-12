// purchaseOrderRoutes.js
import express from 'express';
import { getPurchaseOrders } from '../controllers/purchaseOrderController.js';

const router = express.Router();

// Ruta para obtener todas las órdenes de compra
router.get('/purchase-orders', getPurchaseOrders);

export default router;
