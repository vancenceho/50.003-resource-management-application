const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workshopSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  dateStart: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  dateEnd: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  location: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  type: {
    type: String,
    required: true,
    default: "workshop",
  },
  maxParticipants: {
    type: Number,
    required: true,
  },
  trainerId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Workshop", workshopSchema);
