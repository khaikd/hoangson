const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    typeBed: {
        type: String,
        enum: ['double', 'twin', 'double/twin', 'triple', 'family', 'king bed', 'queen bed', 'king bed/twin', 'queen bed/twin'],
        required: true
    },
    maxRoom: {
        type: Number
    },
    maxAdult: {
        type: Number
    },
    extraBed: {
        type: String,
        enum: ['no', 'yes']
    },
    connecting: {
        type: String,
        enum: ['no', 'yes']
    },
    locationRoom: {
        type: String
    },
    description: {
        type: String,
        require: true
    },
    cruiseId: {
        type: Schema.Types.ObjectId,
        ref: 'cruises'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('rooms', RoomSchema)