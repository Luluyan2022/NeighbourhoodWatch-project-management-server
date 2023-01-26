const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const secondHandGoodsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum:[
                "Autos",
                "Bicycles", 
                "Electronics", 
                "Pets",
                "Fashion & Beauty",
                "Family, Child & Baby",
                "Others"
            ]
        },
        description: {
            type: String,
            required: true
        },
        imageUrl: String,           
       
        contact: {
            type: String,
            required: true
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