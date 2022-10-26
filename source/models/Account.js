const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const accountSchema = new Schema({
  username: String,
  password: String,
  name: String,
  gender: String,
  age: Number,
});

const Account = mongoose.model('user', accountSchema)

module.exports = Account