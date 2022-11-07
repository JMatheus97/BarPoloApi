const mongoose = require('../../db/conn');
const { Schema } = mongoose;

const TipoItem = mongoose.model(
    'TipoItem',
    new Schema({
        nome: {
            type: String,
            required: true,
            allowNull: false
        },
        tipo: {
            type: String,
            enum:["Implatavel", "Semi-Critico", "N/A"],
            required: true,
            allowNull: false
        },
        quantidadeMaterial: {
            type: Number,
            allowNull: false
        },
        file: {
            type: String,
            allowNull: false
        }
    },
        { timestamps: true},
    )
);



module.exports = TipoItem;