// inventoryRoutes.js
import express from 'express';
import { addInventoryOperation, getInventory } from '../controllers/inventoryController.js';

const router = express.Router();

// Rutas
router.post('/inventory', addInventoryOperation); // Endpoint para agregar una operación de inventario (entrada o salida)
router.get('/inventory', getInventory); // Endpoint para obtener el inventario completo

export default router;
