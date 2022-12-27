const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Usuario = mongoose.model(
    'Usuario',
    new Schema({
        nome: {
            type: String,
            required: true,
            allowNull: false,
        },
        userName: {
            type: String,
            required: true,
            allowNull: false,
        },
        password: {
            type: String,
            required: true,
            allowNull: false,
        },
        perfil: {
            type: String,
            required: true,
            allowNull: false,
        },
    })
)
module.exports = Usuario;