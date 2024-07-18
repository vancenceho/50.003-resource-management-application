const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "trainer" },
  status: { type: String, required: false, default: "available" },
});

module.exports = mongoose.model("Trainer", trainerSchema);
