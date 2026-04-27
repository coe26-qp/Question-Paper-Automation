const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["EXAM_CELL", "EXTERNAL"],
      required: true,
    },

    loginExpiry: {
      type: Date, // only for EXTERNAL faculty
    },

    loginHistory: [
      {
        loginTime: Date,
        logoutTime: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
