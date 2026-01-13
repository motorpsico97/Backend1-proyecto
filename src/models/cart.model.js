import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        products: {
            type: [
                {
                    product: {type: mongoose.Schema.Types.ObjectId, ref:"ProductModel"},
                    quantity:  {type: Number}
                }
            ],
            default: [],
        }
    },
    { timestamps: true }
);

const CartModel = mongoose.model("CartModel", cartSchema);
export default CartModel;