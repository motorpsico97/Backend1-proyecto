// 1 - Importamos modulos
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";


// 2 - Definimos el esquema del producto.
/* En singular porque es para todos los productos */

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minLength: 5,
            maxLength: 100,
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 500,
        },
        code: {
            type: String,
            required: true,
            trim: true, /* Elimina espacios en blanco al inicio y al final */
            uppercase: true, /* Convierte a mayúsculas */
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            required: true,
            enum:["Calzados", "Indumentaria", "Accesorios"] /* Valores permitidos */
        },
        thumbnails: {
            type: String,
            trim: true,
            default: "product.jpg",
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
        status:{
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

// INDICES
/* Los indices se utilizan para mejorar la velocidad de las consultas en la base de datos */
productSchema.index({title: 1}, {unique: true}); /* Indice unico en el titulo del producto */
productSchema.index({description: "text"}); /* Indice de texto en la descripcion del producto */
productSchema.index({code: 1}, {unique: true}); /* Indice unico en el codigo del producto */
productSchema.index({price: 1}); /* Indice en el precio del producto */
productSchema.index({category: 1}); /* Indice en la categoria del producto */

// 3 - Agregamos el plugin de paginacion al esquema
productSchema.plugin(paginate);


// 4 - Creamos el modelo del producto
const ProductModel = mongoose.model("ProductModel", productSchema);





//  - Exportamos el modelo
export default ProductModel; 