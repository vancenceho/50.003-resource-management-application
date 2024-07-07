const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  workshopID: { type: Array, required: false },
  leaveRequests: { type: Array, required: false },
  leaveStatus: { type: String, required: false },
  clientID: { type: Array, required: false },

})


module.exports =  mongoose.model('Trainer', trainerSchema);