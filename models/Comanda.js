const mongoose  = require("../db/conn");
const { Schema } = mongoose;

 const Comanda = mongoose.model(
    'Comanda',
    new Schema({
        nomeCliente: {
            type: String,
            required: true,
            allowNull: false,
        },
        valor: {
            type: Number,
            required: true,
            allowNull: false,
        },
        status: {
            type: String,
            required: true,
            allowNull: false,
        },
        mesa: {
            type: Schema.Types.ObjectId,
            ref:"Mesa",
            required: true,
            allowNull: false
        },
        usuario: { 
            type: Schema.Types.ObjectId,
            ref:"Usuario",
            required: true,
            allowNull: false,
        },
        produto: [{
            type: Schema.Types.ObjectId,
            ref:"Produto"
        }]
    },  { timestamps: true})
 )

 module.exports = Comanda;