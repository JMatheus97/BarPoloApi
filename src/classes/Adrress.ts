import { Schema, model } from 'mongoose'
import { Adress } from '../interfaces/AdressI'


 const adressSchema =   new Schema<Adress>({
    cep: { type: String, required: true, allowNull: false},
    street: { type: String, required: true, allowNull: false},
    numberStore: Number,
    city: { type: String, required: true, allowNull: false},
    district: { type: String, required: true, allowNull: false},
    uf: { type: String, required: true, allowNull: false},
    complement: { type: String},

},  { timestamps: true})

const  AdresssModal = model<Adress>('Adress', adressSchema);

export default AdresssModal;


