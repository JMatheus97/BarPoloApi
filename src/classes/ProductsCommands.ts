import { Schema, model } from "mongoose";
import {  ProductsComandsI } from "../interfaces/ComandasI";

const productsCommandsSchema = new Schema<ProductsComandsI>({
  products: { type: Schema.Types.ObjectId, ref: "ProductsComands",  required: true, allowNull: false},
  amount: { type:Number,  required: true, allowNull: false},
}, { timestamps: true})

const ProductsComandsModal = model<ProductsComandsI>('ProductsComands', productsCommandsSchema);

export default ProductsComandsModal;
