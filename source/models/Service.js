const mongoose = require('mongoose')
const {Schema} = mongoose

const ServiceSchema = new Schema({
    name: String,
    description: String,
    price: String,
})

const Service = mongoose.model('service', ServiceSchema)

module.exports = Service