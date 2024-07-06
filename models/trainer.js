const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true }
})


module.exports =  mongoose.model('Trainer', trainerSchema);