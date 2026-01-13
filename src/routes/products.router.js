// 1 - Importamos modulos
import express from 'express';
import ProductModel from '../models/product.models.js';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products.controllers.js';

// 2 - Creamos el router de productos
const productsRouter = express.Router();

// 3 - Definimos las rutas

// 3a - Ruta para obtener todos los productos
productsRouter.get('/', getProducts );

// 3b - Ruta para crear un nuevo producto
productsRouter.post('/', createProduct );

// 3c - Ruta para modificar un producto por ID
productsRouter.put('/:pid', updateProduct);

// 3d - Ruta para eliminar un producto por ID
productsRouter.delete('/:pid', deleteProduct);

// - Exportamos el router
export default productsRouter;