import express from 'express';
import ProductModel from '../models/product.models.js';
import CartModel from '../models/cart.model.js';

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const {limit = 10, page = 1, category} = req.query;
        
        // Creamos el filtro para la consulta
        const filter = category ? { category } : {};
        
        const productsData = await ProductModel.paginate(filter, {limit, page, lean:true});
            const products = productsData.docs;
            delete productsData.docs;

        // Construimos los links de paginación
        const links = []; 
        const categoryParam = category ? `&category=${category}` : '';
        for(let index = 1; index <= productsData.totalPages; index++){
            links.push({
                text: index,
                link: `?limit=${limit}&page=${index}${categoryParam}`
            });
        };
        res.render('home', {products, links, selectedCategory: category})
    
    } catch (error) {
        res.status(500).send({status: 'error', error: 'Error al cargar la vista'})
    }
});

// 6 - Visualizar un carrito específico
viewsRouter.get('/cart/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        
        // Buscamos el carrito por id y populamos los productos
        const cart = await CartModel.findById(cid).populate('products.product').lean();
        
        // Verificamos si el carrito existe
        if (!cart) {
            return res.status(404).send({status: 'error', error: 'Carrito no encontrado'});
        }
        
        // Calculamos el total del carrito
        let total = 0;
        cart.products.forEach(item => {
            if (item.product) {
                item.subtotal = (item.product.price * item.quantity).toFixed(2);
                total += item.product.price * item.quantity;
            }
        });
        
        res.render('cart', { 
            products: cart.products, 
            total: total.toFixed(2),
            cartId: cid 
        });
        
    } catch (error) {
        res.status(500).send({status: 'error', error: 'Error al cargar el carrito'})
    }
});


export default viewsRouter;