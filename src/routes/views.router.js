import express from 'express';
import ProductModel from '../models/product.models.js';

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res) => {
    try {
        const {limit = 10, page = 1} = req.query;
        const productsData = await ProductModel.paginate({}, {limit, page, lean:true});
            const products = productsData.docs;
            delete productsData.docs;

        // Construimos los links de paginación
        const links = []; 
        for(let index = 1; index <= productsData.totalPages; index++){
            links.push({
                text: index,
                link: `?limit=${limit}&page=${index}`
            });
        };


        res.render('home', {products, links})
    } catch (error) {
        res.status(500).send({status: 'error', error: 'Error al cargar la vista'})
    }
});

export default viewsRouter;