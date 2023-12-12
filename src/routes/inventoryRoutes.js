// inventory.routes.js
import express from 'express';
import { addInventoryEntry, addInventoryExit, getInventory } from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/inventory/entry', addInventoryEntry);
router.post('/inventory/exit', addInventoryExit);
router.get('/inventory', getInventory);

export default router;
