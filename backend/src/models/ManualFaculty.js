const mongoose = require("mongoose");

const manualFacultySchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" // EXAM_CELL
    },

    isActive: {
        type: Boolean,
        default: true
    },
    name: String,
    department: String,
    email: String,
    phone: String,

}, { timestamps: true });

module.exports = mongoose.model("ManualFaculty", manualFacultySchema);