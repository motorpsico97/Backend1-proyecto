import CartModel from "../models/cart.model.js";

// 3 - Definimos un cart vacio
export const createCart =  async (req, res) => {
    try {

        const cart = await CartModel.create({});
        res.status(201).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// 4 - Agregar productos al carrito
export const addProductToCart = async (req, res) => {
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
};

// 5 - Obtener productos del carrito
export const getCartProducts = async (req, res) => {
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
};

// 6 - Visualizar un carrito específico
export const viewCart = async (req, res) => {
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
};