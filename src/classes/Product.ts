import { Schema, model } from 'mongoose';
import { ProductI } from '../interfaces/ProductI';

const productSchema =  new Schema<ProductI>({
  nome: { type: String, required: true, allowNull: false},
  valor: { type: Number}
}, { timestamps: true })

const ProductModal = model<ProductI>('Product', productSchema );

export default ProductModal;
