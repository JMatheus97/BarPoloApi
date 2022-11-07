const mongoose = require('../../db/conn');
const { Schema } = mongoose;

const Procedimento = mongoose.model(
    'Procedimento',
    new Schema ({
    nome: {
        type: String,
        required: true,
        allowNull: false,
    },
    obrigatorio: {
        type:Boolean,
        required: true,
        allowNull: false,
    },
    tipoItem: [{
        type: Schema.Types.ObjectId,
        ref: 'TipoItem'
    }]
    },
    { timestamps: true}
    )      
);


module.exports = Procedimento;