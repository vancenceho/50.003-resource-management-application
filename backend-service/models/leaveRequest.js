const mongoose = require("mongoose");
const moment = require("moment");

moment.locale("en-sg");

const Schema = mongoose.Schema;

const leaveRequestSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },
  startDate: {
    type: String,
    required: true,
    default: Date.now(),
  },
  endDate: {
    type: String,
    required: true,
    default: Date.now(),
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
    default: "leave",
  },
  reason: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
