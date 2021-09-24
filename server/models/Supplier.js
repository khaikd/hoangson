const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SupplierSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'units'
    },
    price: {
        type: Number,
        //require: true
    },
    totalPrice: {
        type: Number,
        //require: true
    },
    status: {
        type: String,
        enum: ['export', 'import']
    },
    material: {
        type: Schema.Types.ObjectId,
        ref: 'materials'
    },
    depot: {
        type: Schema.Types.ObjectId,
        ref: 'depots'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('suppliers', SupplierSchema)