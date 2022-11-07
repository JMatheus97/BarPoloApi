const mongoose = require('../../db/conn');

const { Schema } = mongoose;

const User = mongoose.model(
    'Usuario',
    new Schema({
        nome: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        perfil: {
            type: String,
            required: true
        }
    },
        { timestamps: true},
    )
);

module.exports = User;

