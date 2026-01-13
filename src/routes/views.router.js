import express from 'express';
import ProductModel from '../models/product.models.js';

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

export default viewsRouter;