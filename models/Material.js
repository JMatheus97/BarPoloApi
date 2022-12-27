const mongoose = require('../../db/conn');
const { Schema } = mongoose;
const EnumMaterial = require('../../helpers/Enum/EnumMaterial');

const Material = mongoose.model(
    'Material', 
    new Schema({
        nome: {
            type: String,
            requred: true,
            allowNull: false
        },
        terceiro: {
            type: Boolean,
            default: false,
        },
        fabricante: {
            type: String,
            default: "",
        },
        modelo: {
            type: String,
            default: "",
        },
        code: {
            type: String,
            required: true
        },
        indicadorCaixa: {
            type: Boolean,
            default: false,
        },
        valor: {
            type: Number,
            default:0,
        },
        indicadorDisponivelSaida: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: EnumMaterial,
            required: true,
            allowNull: false
        },
        dataCadastro: {
            type: Date,
            requred: true, 
            allowNull: false,
        },
        quantidadeEsterilizacoes: {
            type: Number,
            default: 0
        },
        procedimento: [{
            type: Schema.Types.ObjectId,
            default: null,
            ref:"Procedimento"
        }],
        tipoItem: {
            type: Schema.Types.ObjectId,
            ref:"TipoItem"
        },
        itens: [{
            type: Schema.Types.ObjectId,
            default: null,
            ref: "Material"
        }],
        caixa: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: "Material"
        },
        localizacao: {
            type: Schema.Types.ObjectId,
            default: null,
            ref: "Localizacao"
        }
    },
    {timestamps: true}
    )
);

module.exports = Material;
