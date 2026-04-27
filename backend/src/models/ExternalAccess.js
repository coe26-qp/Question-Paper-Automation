const mongoose = require("mongoose");

const externalAccessSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },

  questionBankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionBank",
    required: true
  },

  examinerName: {
    type: String,
    required: true
  },

  examinerEmail: {
    type: String,
    required: true
  },

  tempUserId: {
    type: String,
    unique: true,
    required: true
  },

  // tempPasswordHash: {
  //   type: String,
  //   required: true
  // },

  tempPassword: {
    type: String,
    required: true
  },

  // expiresAt: {
  //   type: Date,
  //   required: true
  // },

  isActive: {
    type: Boolean,
    default: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  //   questionBankId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   index: true
  // }


}, { timestamps: true });

module.exports = mongoose.model("ExternalAccess", externalAccessSchema);
