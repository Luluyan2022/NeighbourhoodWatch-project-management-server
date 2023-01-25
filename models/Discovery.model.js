const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const discoverySchema = new Schema(
    {
        title: {
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
        author: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
    },
    {

        timestamps: true
    }
)

module.exports = model('Discovery', discoverySchema)