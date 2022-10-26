const mongoose = require('mongoose')
const {Schema} = mongoose

const messageSchema = new Schema({
    senderId: String,
    recieverId: String,
    message: String,
}, {
    timestamps: true
})

const Message = mongoose.model('message', messageSchema)

module.exports = Message