import express from 'express';
import { getPurchaseOrders,updatePurchaseOrder,updateOrderAndInventory,createPurchaseOrder } from '../controllers/purchaseOrderController.js';

const router = express.Router();

// Ruta para obtener todas las órdenes de compra
router.get('/purchase-orders', getPurchaseOrders);
router.post('/purchase-orders', createPurchaseOrder);
router.put('/purchase-orders/:orderId', updatePurchaseOrder);
router.put('/purchase-orders-received/:orderId', updateOrderAndInventory);







export default router;
