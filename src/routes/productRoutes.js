import express from 'express';
const router = express.Router();
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';

// Rutas
router.post('/products', createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;



