import { Schema, model } from 'mongoose'
import { AdressI } from '../interfaces/AdressI'


 const adressSchema =   new Schema<AdressI>({
    cep: { type: String, required: true, allowNull: false},
    street: { type: String, required: true, allowNull: false},
    numberStore: Number,
    city: { type: String, required: true, allowNull: false},
    district: { type: String, required: true, allowNull: false},
    uf: { type: String, required: true, allowNull: false},
    complement: { type: String},

},  { timestamps: true})

const  AdresssModal = model<AdressI>('Adress', adressSchema);

export default AdresssModal;


