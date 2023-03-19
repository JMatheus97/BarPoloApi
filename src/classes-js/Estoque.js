const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Estoque = mongoose.model(
    'Estoque',
    new Schema({
        produto: {
            type: Schema.Types.ObjectId,
            ref:"Produto",
            required: true,
            allowNull: false,
        },
        quantidade: {
            type: Number,
            required: true,
            allowNull: false
        },
        tipo: {
            type: String,
            required: true,
            allowNull: false
        }, 
        lote: {
            type: String,
            required: true,
            allowNull: false
        }
    },  { timestamps: true})
)

module.exports = Estoque;