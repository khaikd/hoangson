const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CruiseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    rating: {
        type: Number
    },
    typeClass: {
        type: String,
        require: false
    },
    cabins: {
        type: Number
    },
    description: {
        type: String,
        require: true
    },
    notes: {
        type: String
    },
    sortOrder: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('cruises', CruiseSchema)