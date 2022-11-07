const mongoose = require('../db/conn');
const { Schema } = mongoose;

const EquipamentoManutecao = mongoose.model(
    'EquipamentoManutecao',
    new Schema({
        tipo: {
            type: String,
            required: true
        },
        data: {
            type: Date,
            required: true
        },
        validade: {
            type: Date,
            required: true
        },
        observacao: {
            type: String,
            required: true
        },
        ativado: {
            type: Array,
            required: true
        },
    },
        { timestamps: true},
    )
);

module.exports = EquipamentoManutecao;