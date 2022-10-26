const mongoose = require('mongoose')
const {Schema} = mongoose

const RoomTypesSchema = new Schema({
    type: String,
})

const RoomTypes = mongoose.model('roomtype', RoomTypesSchema)

module.exports = RoomTypes