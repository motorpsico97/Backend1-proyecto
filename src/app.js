// 1 - Importamos modulos
import express from 'express';
import productsRouter from "./routes/products.router.js";
import connectMongoDB from './config/db.js';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';


import __dirname from '../dirname.js';
import { errorHandler } from './middlewares/error.middlewares.js';
import { getCategoriesMiddleware } from './middlewares/categories.middlewares.js';

import cartsRouter from './routes/carts.router.js';

// 1a - Configuramos dotenv
dotenv.config({path: __dirname + '/.env'});

// 2 - Creamos una instancia de express
const app = express();
app.use(express.json());

// 2b - Middleware para servir archivos estáticos
app.use(express.static(__dirname + '/public'));

// 3 - Definimos el puerto
const PORT = process.env.PORT || 8080;

// 4 - Conectamos a la base de datos MongoDB

// Inicializamos la conexión a MongoDB
connectMongoDB();

// 4b - Configuración del motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

// 4c - Middleware para hacer las categorías disponibles en todas las vistas
app.use(getCategoriesMiddleware);

// 5 - Endpoint 
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
app.use('/', viewsRouter);

// 6 - Middleware de manejo de errores
/* Debe ser el ultimo pero antes del inicio del servidor */
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor iniciado correctamente`);
});