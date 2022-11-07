const mongoose = require('../../db/conn');
const { Schema } = mongoose;

const Parametros = mongoose.model(
    'Parametros',
    new Schema({
        entradacc: {
            type: Boolean,
            default: false,
            required: true
        },
        saidacc: {
            type: Boolean,
            default: false,
            required: true
        },
        recebimento: {
            type: Boolean,
            default: false,
            required: true
        },
        imagemLogo: {
            type: String,
            default: "",
        },
        etiqueta: {
            type: String,
            default: "",
        },
        itens: {
            type: Boolean,
            default: false,
        },
        controlaItensLimpeza:{
            type: Boolean,
            default: false,
        },
        controlaItensPreparo:{
            type: Boolean,
            default: false
        },
        limpezaRecebimentoSelect: {
            type: Boolean,
            default:false
        },
        recebimentoAvulsoSelect: {
            type: Boolean,
            default:false
        },
        
    },
        { 
            timestamps: true
        },
    )
);

module.exports = Parametros;