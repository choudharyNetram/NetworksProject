
// visitor.js

const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  mobileNo: { type: String, required: true },
  comingFrom: { type: String, required: true },
  vehicleNo: { type: String },
  whomToMeet: { type: String, required: true },
  inTime: { type: String, required: true }, // Changed type to String for time in "hh:mm AM/PM" format
  outTime: { type: String }, // Changed type to String for time in "hh:mm AM/PM" format
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
