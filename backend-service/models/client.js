const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  firstName: { type: String, required: true }, 
  lastName: { type: String, required: true },
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: {type: String, required: true, default: "client"},

})


module.exports =  mongoose.model('Client', clientSchema);