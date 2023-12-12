// categoryRoutes.js
import { Router } from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategory,
} from '../controllers/categoryController.js';

const router = Router();

// Rutas
router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;
