// purchaseOrderRoutes.js
import express from 'express';
import { getPurchaseOrders,updatePurchaseOrder } from '../controllers/purchaseOrderController.js';

const router = express.Router();

// Ruta para obtener todas las órdenes de compra
router.get('/purchase-orders', getPurchaseOrders);
router.put('/purchase-orders/:orderId', updatePurchaseOrder);





export default router;
