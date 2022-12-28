const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Produto = mongoose.model(
    'Produto',
    new Schema({
        nome: {
            type: String,
            required: true,
            allowNull: false,
        },
        valor: {
            type: Number,
            required: true,
            allowNull: false,
        }
    })
)

module.exports = Produto;