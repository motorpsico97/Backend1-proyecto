import ProductModel from "../models/product.models.js";

// Middleware para obtener las categorías y hacerlas disponibles en todas las vistas
export const getCategoriesMiddleware = async (req, res, next) => {
    try {
        // Obtenemos todas las categorías únicas desde la base de datos
        const categories = await ProductModel.distinct('category');
        
        // Hacemos las categorías disponibles en res.locals para que estén disponibles en todas las vistas
        res.locals.categories = categories;
        
        next();
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.locals.categories = [];
        next();
    }
};
