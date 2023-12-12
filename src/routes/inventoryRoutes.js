// inventoryRoutes.js
import express from 'express';
import { addInventoryEntry, addInventoryExit, getInventory } from '../controllers/inventoryController.js';

const router = express.Router();

// Rutas
router.post('/inventory/entry', addInventoryEntry); // Endpoint para agregar una operación de entrada en el inventario
router.post('/inventory/exit', addInventoryExit);   // Endpoint para agregar una operación de salida en el inventario
router.get('/inventory', getInventory);             // Endpoint para obtener el inventario completo

export default router;
