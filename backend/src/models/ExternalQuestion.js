const mongoose = require("mongoose");

const externalQuestionSchema = new mongoose.Schema(
  {
    questionBankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionBank",
      required: true
    },

    subject: String,

    examinerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    questionId: Number,
    co: Number,
    unitTitle: String,
    // type: String,
    type: {
      type: String,
      enum: ["O", "D"],
      required: true
    },

    part: Number,
    question: String,
    questionImage: String,
    marks: Number,
    bloomsTaxonomy: String,
    level: String,

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "FROZEN"],
      default: "PENDING"
    },

    approved: {
      type: Boolean,
      default: false
    },

    frozen: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExternalQuestion", externalQuestionSchema);
