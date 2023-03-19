const mongose = require("../db/conn");
const { Schema } = mongose;

const Store = mongose.model(
    'Store',
    new Schema({
        name: {
            type: String,
            required: true,
            allowNull: false
        },
        follow: {
            type: String,
            required: true,
            allowNull: false,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
            required: true,
            allowNull: false
        }
    })
)