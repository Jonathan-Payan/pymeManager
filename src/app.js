// app.js
import express from 'express';
import morgan from 'morgan';
import usersRoutes from './routes/userRoutes.js';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';  
import inventoryRoutes from './routes/inventoryRoutes.js';  


const app = express();

//setAssociations();

// Middleware de CORS
app.use(cors()); // Habilita CORS para todas las rutas

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/', usersRoutes);
app.use('/api/', productRoutes);
app.use('/api/', supplierRoutes);
app.use('/api/', categoryRoutes); 
app.use('/api/', inventoryRoutes); 
export default app;
