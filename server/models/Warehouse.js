const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WarehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('warehouses', WarehouseSchema)