import { Schema, model } from "mongoose";
import { MesaI } from "../interfaces/MesaI";

const mesaSchema = new Schema<MesaI>({
  numeroMesa: { type: Number, required: true, allowNull: false},
  quantidadeCliente: { type: Number},
  status: { type: String, required: true, allowNull: false}
})

const MesaModal = model<MesaI>('Mesa', mesaSchema);

export default MesaModal;
