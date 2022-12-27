const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Material = mongoose.model(
    'Mesa', 
    new Schema({
        numeroMesa: {
            type: Number,
            requred: true,
            allowNull: false
        },
        quantidadeCliente: {
            type: Number,
            default: false,
        },
    },
    {timestamps: true}
    )
);

module.exports = Material;
