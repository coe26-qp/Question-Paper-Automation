const mongoose = require("mongoose");

const manualQuestionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },

    createdBy: {
        type: String, // userId of manual faculty
        required: true
    },

    unit: Number,
    co: Number,

    type: {
        type: String,
        enum: ["O", "D"],
        required: true
    },

    part: Number,

    question: {
        type: String,
        // required: true
    },
    questionImage: {
        type: String // base64 string
    },

    marks: Number,

    bloomsTaxonomy: String,
    level: String,

    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "FROZEN"],
        default: "PENDING"
    },


}, { timestamps: true });

manualQuestionSchema.pre("save", async function () {
    if (!this.question && !this.questionImage) {
        throw new Error("Either question text or image is required");
    }
});

module.exports = mongoose.model("ManualQuestion", manualQuestionSchema);