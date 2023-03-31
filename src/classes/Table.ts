import { Schema, model } from "mongoose";
import { TableI } from "../interfaces/TableI";

const mesaSchema = new Schema<TableI>({
  tableNumber: { type: Number, required: true, allowNull: false},
  customerQuantity: { type: Number},
  status: { type: String, required: true, allowNull: false}
})

const TableModal = model<TableI>('Mesa', mesaSchema);

export default TableModal;
