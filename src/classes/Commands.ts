import { Schema, model } from "mongoose";
import { CommandsI } from "../interfaces/ComandasI";

const commandsSchema = new Schema<CommandsI>({
  employee: { type: Schema.Types.ObjectId, ref: "Employee"},
  table: { type: Schema.Types.ObjectId, ref: "Table", required: true, allowNull: false},
  productsComands: [{ type: Schema.Types.ObjectId, ref: "ProductsComands",  required: true, allowNull: false}],
  status: { type: String,  required: true, allowNull: false},
  amountToPay: { type: Number,  required: true, allowNull: false},
  paymentMethod: { type: String}
}, { timestamps: true})

const CommandsModel = model<CommandsI>('Commands', commandsSchema);

export default CommandsModel;
