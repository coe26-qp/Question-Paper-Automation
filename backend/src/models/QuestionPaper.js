const mongoose = require("mongoose");

const QuestionPaperSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },

    createdBy: {
      type: String, // from req.external (faculty / external user)
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "final"],
      default: "draft",
    },
    examDetails: {
      year: String,
      degree: String,
      branch: String,
      semester:String,
      courseName: String,
      date: String
    },

    partA: {
      type: Object, // storing generated structure directly
      default: {},
    },

    partB: {
      type: Object,
      default: {},
    },

    partC: {
      type: Array,
      default: [],
    },
    pattern: {
      type: String,
      enum: ["R24SEM", "R24IA1","R24IA2", "R20IA1", "R20IA2", "R20SEM"],
      default: "R24SEM"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("QuestionPaper", QuestionPaperSchema);
