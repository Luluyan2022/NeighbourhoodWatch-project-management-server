const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const secondHandGoodsSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        variety: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: false
        },
        contact: {
            type: String,
            require: true
        },
        author: {
            type: Schema.Types.ObjectId, ref: 'User'
        }

    },
    {

        timestamps: true
    }
)

module.exports = model('SecondHandGoods', secondHandGoodsSchema)