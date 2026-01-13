// 1 - Importamos modelos
import express from 'express';
import CartModel from '../models/cart.model.js';

// 2 - Configuramos el router
const cartsRouter = express.Router();

// 3 - Definimos un cart vacio
cartsRouter.post('/', async (req, res) => {
    try {

        const cart = await CartModel.create({});
        res.status(201).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 4 - Agregar productos al carrito
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        // Capturamos los parametros
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        ////////////////////
        // VERIFICACIONES///
        ////////////////////
        // Verificamos que el producto exista
        
        

        // Verificamos que el carrito exista

        // Verificamos si el producto ya existe en el carrito
            // Si existe, actualizamos la cantidad

            // Si no existe, lo agregamos al carrito
            const updateCart = await CartModel.findByIdAndUpdate(cid, {$push:{products: {product:pid, quantity}}}, {new:true, runValidators:true});
        


        res.status(200).json({ status: 'success', payload: updateCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 5 - Obtener productos del carrito
cartsRouter.get('/:cid', async (req, res) => {
    try {
        // Capturamos el cid
        const cid = req.params.cid;

        // Buscamos el carrito por id y populamos los productos
        const cart = await CartModel.findById(cid).populate('products.product');

        // Verigicamos si el carrito existe
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

        // Respondemos con el carrito
        res.status(200).json({ status: 'success', payload: cart.products });        

    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});



//  Exportamos el router
export default cartsRouter;
