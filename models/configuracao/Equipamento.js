const mongoose = require('../../db/conn');
const { Schema } = mongoose;

const Equipamento = mongoose.model(
    'Equipamento',
    new Schema({
        nome: {
            type: String,
            required: true
        },
        capacidade: {
            type: String,
        },
        marca: {
            type: String,
        },
        modelo: {
            type: String,
        },
        tipoEquipamento: {
            type: String,
            enum:["Lavadora", "Autoclave", "Cortado de Grau Cirúgico", "Incubadora Biológico", 
            "Seladora", "Secadora de Traqueia", "Termo Desinfectadora"],
            required: true
        },
        categoria: {
            type: String,
            enum:["Vapor", "Peróxido", "Formoldeido", "Termo", 
            "Ultrasônica", "Outros"],
            required: true
        },
        status: {
            type: String,
            enum:["Disponivel", "Em Manutenção"],
            required: true
        },
    },
        { timestamps: true},
    )
);

module.exports = Equipamento;