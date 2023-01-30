const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const discoverySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },        
        description: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },        
        author: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        likerArr:[String]
    },
    {

        timestamps: true
    }
)

module.exports = model('Discovery', discoverySchema)