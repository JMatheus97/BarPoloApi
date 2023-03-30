import { Schema, model } from "mongoose";
import { StockI } from "../interfaces/StockI";


const stockSchema = new Schema<StockI>({
  product: { type: Schema.Types.ObjectId, ref: "Prodcut", required: true, allowNull: false},
  amount: { type: Number, required: true, allowNull: false},
  type: { type: String, required: true, allowNull: false},
  code: { type: String, required: true, allowNull: false},
  validity: { type: Date},
  batch: { type: String},
  unitOfMeasurement: { type: String, required: true, allowNull: false},


}, { timestamps: true})

const StockModel = model<StockI>('Stock', stockSchema);

export default StockModel;
