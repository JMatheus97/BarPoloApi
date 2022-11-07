const mongoose = require('../../db/conn');
const { Schema } = mongoose;

const Localizacao = mongoose.model(
    'Localizacao',
    new Schema({
        armario: {
            type: String,
            required: true
        },
        prateleira: {
            type: String,
            required: true
        },
        sala: {
            type: String
        },
    },
        { timestamps: true},
    )
);

module.exports = Localizacao;