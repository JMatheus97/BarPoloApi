const mongoose = require('../../db/conn');
const { Schema } = mongoose;

const Detergente = mongoose.model(
    'Detergente',
    new Schema({
        nome: {
            type: String,
            allowNull: false,
            required: true
        },
        tipo: {
            type: String,
            enum:["Neutro", "Alcalino", "Enzimático"],
            allowNull: false,
            required: true
        },
        marca: {
            type: String
        },
        enzimas: {
            type: String
        },
        ph: {
            type: String
        },
        diluicao: {
            type: String,
        },
        temperatura: {
            type: String,
            required: true
        },
        lote: {
            type: String
        }
    },
        { timestamps: true},
    )
);

module.exports = Detergente;