const mongoose = require('mongoose')
const Schema = mongoose.Schema

// nhap kho
const DepotSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        require: true
    },
    warehouse: {
        type: Schema.Types.ObjectId,
        ref: 'warehouses'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    total: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('depots', DepotSchema)