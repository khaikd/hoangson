const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConstructionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    publicDate: {
        type: Date
    },
    finishDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['under', 'pause', 'complete'] // 'under đang thi công', 'pause tạm dừng thi công', 'complete hoàn thành thi công'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('constructions', ConstructionSchema)