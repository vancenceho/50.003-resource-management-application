const mongoose = require("mongoose");
const moment = require("moment");

moment.locale("en-sg");

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
  location: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
    required: true,
    default: Date.now(),
  },
  timeEnd: {
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
    default: "workshop",
  },
  maxParticipants: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  trainer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
  ],
  dealSize: {
    type: Number, //total amount of money involved in the deal
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("Workshop", workshopSchema);
