const mongoose = require('../../db/conn');
const { Schema } = mongoose;

const Embalagem = mongoose.model(
    'Embalagem',
    new Schema({
        nome: {
            type: String,
            allowNull: false,
            required: true
            
        },  
        validade: {
            type: Number,
            allowNull: false,
            required: true
        }
    },
        { timestamps: true},
    )
);

module.exports = Embalagem;