const mongoose = require('mongoose')
const {Schema} = mongoose

const RoomSchema = new Schema({
    name: String,
    type: String,
    status:String,
    actualState: String,
    price: String,
    customer: String,
    time: Date,
    serviceList: Array,
})

const Room = mongoose.model('room', RoomSchema)

module.exports = Room