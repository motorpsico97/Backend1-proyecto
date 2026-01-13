// 1 - Importamos modelos
import express from 'express';
import CartModel from '../models/cart.model.js';

import { createCart, addProductToCart, getCartProducts, viewCart } from '../controllers/cart.controllers.js';

// 2 - Configuramos el router
const cartsRouter = express.Router();

// 3 - Definimos un cart vacio
cartsRouter.post('/', createCart);

// 4 - Agregar productos al carrito
cartsRouter.post('/:cid/product/:pid', addProductToCart);

// 5 - Obtener productos del carrito
cartsRouter.get('/:cid', getCartProducts);

// 6 - Visualizar un carrito específico
cartsRouter.get('/cart/:cid', viewCart );


//  Exportamos el router
export default cartsRouter;
