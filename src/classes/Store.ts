import { Schema, model } from 'mongoose'
import { StoreI } from '../interfaces/StoreI'

const storeSchema = new Schema<StoreI>({
  name: { type: String, require: true, allowNull: false},
  cnpj : { type: String},
  adress: { type: Schema.Types.ObjectId, ref: "Adress", required: true, allowNull: false}
}, { timestamps: true})

const StoreModal = model<StoreI>('Store', storeSchema);

export default StoreModal;
