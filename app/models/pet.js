//PET -> has many toys and owner that is user
const toySchema = require('./toy')
const mongoose =  require('mongoose')

const {Schema, model} = mongoose

const petSchema = new Schema (
    {
        name:{ 
            type: String,
            required: true
        },
        type:{ 
            type: String,
            required: true
        },
        age:{ 
            type: Number,
            required: true
        },
       adoptable :{ 
            type: Boolean,
            required: true
        },
        toys: [toySchema],
        owner:{ 
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    }, {
        timestamps: true,
        toObject : {virtuals : true},
        toJSON: { virtuals: true}
    }
)

petSchema.virtual('fullTitle').get(function () {
    return `${this.name} the ${this.type}`
})

module.exports = model('Pet', petSchema)