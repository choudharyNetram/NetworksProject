const mongoose = require('mongoose');

// Define a schema for the second dataset (DataDisplay2)
const studentVisitorSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  mobileNo: { type: String, required: true },
  address: { type: String, required: true },
  studentName: { type: String, required: true },
  studentMobileNo: { type: String, required: true },
  department: { type: String, required: true },
  hostelRoomNo: { type: String, required: true },
  inTime: { type: Date, required: true },
  outTime: { type: Date },
});

// Create a Mongoose model for the DataDisplay2 data
const studentVisitor= mongoose.model('studentVisitor', studentVisitorSchema);

module.exports = studentVisitor;
