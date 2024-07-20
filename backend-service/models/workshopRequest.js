const mongoose = require("mongoose");
const moment = require("moment");

moment.locale("en-sg");

const Schema = mongoose.Schema;

const startDate = moment().format("LL");
const endDate = moment().format("LL");

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
    default: startDate,
  },
  endDate: {
    type: String,
    required: true,
    default: endDate,
  },
  location: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
    required: true,
    default: moment().format("LT"),
  },
  timeEnd: {
    type: String,
    required: true,
    default: moment().format("LT"),
  },
  duration: {
    type: Number,
    required: true,
    default: moment(startDate).diff(moment(endDate), "days"),
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
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  trainer: {
    type: Array,
    properties: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("Workshop", workshopSchema);
