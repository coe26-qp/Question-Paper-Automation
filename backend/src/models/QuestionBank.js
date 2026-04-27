const mongoose = require("mongoose");

const questionBankSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["UPLOADED", "ASSIGNED"],
      default: "UPLOADED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuestionBank", questionBankSchema);