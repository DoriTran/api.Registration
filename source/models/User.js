const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  isAdmin: Boolean,
  avatar: {type: String, default: 'https://shop.phuongdonghuyenbi.vn/wp-content/uploads/avatars/1510/default-avatar-bpthumb.png'},
});

const User = mongoose.model('user', userSchema)

module.exports = User