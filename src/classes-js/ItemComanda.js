const mongoose = require('../db/conn');
const { Schema } =  mongoose;

const ItemComanda = mongoose.model(
    'ItemComanda',
    new Schema({
        produto: [{ 
        type: Schema.Types.ObjectId,
        ref: "Produto",
        required: true,
        allowNull: false,
    }],
        quantidade: {
            type: Number,
            required: true,
            allowNull: false,
        },
        comanda: {
            type: Schema.Types.ObjectId,
            ref: "Comanda",
            required: true,
            allowNull
        }
    },
    {timestamps: true})
)

module.exports = ItemComanda;