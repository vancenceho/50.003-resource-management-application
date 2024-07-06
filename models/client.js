const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true }, 
  lastName: { type: String, required: true },
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true }
})


module.exports =  mongoose.model('User', userSchema);