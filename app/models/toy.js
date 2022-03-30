const mongoose = require('mongoose')


const toySchema = new mongoose.Schema({
    name: {
        type : String, 
        required : true
    },
    description: {
        type: String
    },
    isSqueaky: {
        type: Boolean,
        default: false,
        required: true
    },
    condition: {
        type: String,
        enum: ['new', 'used', 'disgustin'],
        default: 'new'
    }

},{
    timestamps: true
})

module.exports = toySchema 