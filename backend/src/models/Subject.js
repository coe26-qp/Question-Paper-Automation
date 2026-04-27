const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },
  semester: String,
  department: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Subject", subjectSchema);
