import ProductModel from "../models/product.models.js";


// 1 - Controlador para obtener todos los productos
export const getProducts = async (req, res) => {
    try {

        const {limit = 8, page = 1} = req.query;


        // Obtenemos todos los productos "limpios" (lean) de metadatos e información extra que no necesitamos
        const productsData = await ProductModel.paginate({}, {limit, page, lean:true});
        const products = productsData.docs;
        delete productsData.docs;
        // Enviamos la respuesta con los productos 
        res.status(200).json({ status: 'success', payload: products, ...productsData });
    } catch (error) {
        res.status(500).json({ status: 'error', message: "Error al obtener los productos" });
    }

};

// 2 - Controlador para crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        /* Lo ideal antes es verificar los datos recibidos con la libreria "zod" */

        // Creamos un nuevo producto en la base de datos
        const newProduct = await ProductModel.create(req.body);

        // Enviamos la respuesta con el nuevo producto creado
        res.status(201).json({ status: 'success', payload: newProduct });

    } catch (error) {
        res.status(500).json({ status: 'error', message: "Error al obtener los productos" });
    }
};

// 3 - Controlador para modificar un producto por ID
export const updateProduct = async (req, res) => {
    try {
        // Obtenemos el ID del producto desde los parámetros de la ruta
        const pid = req.params.pid;
        // Obtenemos los datos a actualizar desde el cuerpo de la solicitud
        const updateData = req.body;

        // Actualizamos el producto en la base de datos
        const updatedProduct = await ProductModel.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });

        // Si no se encuentra el producto, enviamos un error 404
        if (!updatedProduct) return res.status(404).json({ status: 'error', message: "Producto no encontrado" });

        // Enviamos la respuesta con el producto actualizado
        res.status(200).json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: "Error al editar el producto" });

    }
};

// 4 - Controlador para eliminar un producto por ID
export const deleteProduct = async (req, res) => {
    try {
        // Obtenemos el ID del producto desde los parámetros de la ruta
        const pid = req.params.pid;

        // Eliminamos el producto de la base de datos
        const deletedProduct = await ProductModel.findByIdAndDelete(pid);

        // Enviamos la respuesta de éxito
        res.status(200).json({ status: 'success', message: "Producto eliminado correctamente", playlopad: deletedProduct });

        // Si no se encuentra el producto, enviamos un error 404
        if (!deletedProduct) return res.status(404).json({ status: 'error', message: "Producto no encontrado" });
    } catch (error) {
        res.status(500).json({ status: 'error', message: "Error al eliminar el producto" });
    }
};