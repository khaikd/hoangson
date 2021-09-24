const mongoose = require('mongoose')
const Schema = mongoose.Schema

// xuat kho
const ExportSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    exporter: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    dateExport: {
        type: Date,
        require: true
    },
    warehouse: {
        type: Schema.Types.ObjectId,
        ref: 'warehouses'
    },
    construction: {
        type: Schema.Types.ObjectId,
        ref: 'constructions'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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

module.exports = mongoose.model('exports', ExportSchema)