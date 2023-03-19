const mongose = require("../db/conn");
const { Schema } = mongose;


const Address = mongose.model(
    'Address',
    new Schema({
        cep: {
            type: String,
            required: true,
            allowNull: false
        },
        street: {
            type: String,
            required:true,
            allowNull: false
        },
        numberStore: {
            type: Number,
            default: ''
        },
        city: {
            type: String,
            required: true,
            allowNull: false
        },
        district: {
            type: String,
            required: true,
            allowNull: false,
        },
        uf: {
            type: String,
            required: true,
            allowNull: false
        },
        complement: {
            type: String,
            required: false,
            allowNull: false
        }

    }, {
        timestamps: true
    })
)


module.exports = Address;

