const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
  username: String,
  password: String,
  fullname: String,
  gender: String,
  age: Number,
});

const Account = mongoose.model('accounts', accountSchema)

module.exports = Account