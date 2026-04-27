const ExternalQuestion = require("../models/ExternalQuestion");
const mongoose = require("mongoose");
// // const Question = require("../models/QuestionBank")
// const REQUIREMENTS = [
//   // PART A
//   { co: 1, part: 1, type: "O", marks: 2, min: 1 },
//   { co: 1, part: 2, type: "O", marks: 2, min: 1 },
//   { co: 2, part: 1, type: "O", marks: 2, min: 1 },
//   { co: 2, part: 2, type: "O", marks: 2, min: 1 },
//   { co: 3, part: 1, type: "O", marks: 2, min: 1 },

//   // PART B
//   { co: 1, part: 1, type: "D", marks: 16, min: 1 },
//   { co: 1, part: 2, type: "D", marks: 16, min: 1 },
//   { co: 2, part: 1, type: "D", marks: 16, min: 1 },
//   { co: 2, part: 2, type: "D", marks: 16, min: 1 },
//   { co: 3, part: 1, type: "D", marks: 8, min: 2 }, // ⚠️ important
// ];

exports.updateExternalQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await ExternalQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // ❌ Frozen questions cannot be edited
    if (question.frozen) {
      return res.status(403).json({
        error: "Frozen question cannot be edited"
      });
    }

    // ✅ Update allowed fields
    const allowedFields = [
      "question",
      "marks",
      "co",
      "bloomsTaxonomy",
      "level",
      "part",
      "type"
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        question[field] = req.body[field];
      }
    });

    // Reset approval on edit
    question.approved = false;
    question.status = "PENDING";

    await question.save();

    res.status(200).json({
      message: "Question updated successfully",
      question
    });

  } catch (error) {
    console.error("Edit question error:", error);
    res.status(500).json({ error: "Failed to update question" });
  }
};


exports.approveExternalQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await ExternalQuestion.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (question.frozen) {
      return res.status(400).json({
        error: "Frozen questions cannot be approved",
      });
    }

    question.approved = true;
    await question.save();

    res.status(200).json({
      message: "Question approved successfully",
      question,
    });

  } catch (error) {
    console.error("Approve error:", error);
    res.status(500).json({ error: "Server error" });
  }
};



exports.freezeExternalQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await ExternalQuestion.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (question.frozen) {
      return res.status(400).json({ error: "Question already frozen" });
    }

    question.frozen = true;
    await question.save();

    res.status(200).json({
      message: "Question frozen successfully",
      question,
    });

  } catch (error) {
    console.error("Freeze error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// // ✅ Progress API

// exports.getApprovedCountByType = async (req, res) => {
//   try {
//     const { questionBankId } = req.query;

//     // ❗ validation
//     if (!questionBankId) {
//       return res.status(400).json({
//         success: false,
//         error: "questionBankId is required"
//       });
//     }

//     const result = await ExternalQuestion.aggregate([
//       {
//         $match: {
//           approved: true,
//           questionBankId: new mongoose.Types.ObjectId(questionBankId)
//         }
//       },
//       {
//         $group: {
//           _id: "$type",
//           count: { $sum: 1 }
//         }
//       }
//     ]);

//     // default values
//     let counts = {
//       O: 0,
//       D: 0
//     };

//     result.forEach(item => {
//       if (item._id === "O") counts.O = item.count;
//       if (item._id === "D") counts.D = item.count;
//     });

//     return res.status(200).json({
//       success: true,
//       questionBankId,
//       counts
//     });

//   } catch (error) {
//     console.error("🔥 Count Error:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };



exports.deApproveExternalQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await ExternalQuestion.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (question.frozen) {
      return res.status(400).json({
        error: "Frozen questions cannot be modified",
      });
    }

    if (!question.approved) {
      return res.status(400).json({
        error: "Question is not approved yet",
      });
    }

    question.approved = false;
    await question.save();

    res.status(200).json({
      message: "Question de-approved successfully",
      question,
    });

  } catch (error) {
    console.error("De-Approve error:", error);
    res.status(500).json({ error: "Server error" });
  }
};




exports.getApprovedCountDetailed = async (req, res) => {
  try {
    const { questionBankId } = req.query;

    // ❗ validation
    if (!questionBankId) {
      return res.status(400).json({
        success: false,
        error: "questionBankId is required"
      });
    }

    const result = await ExternalQuestion.aggregate([
      {
        $match: {
          approved: true,
          questionBankId: new mongoose.Types.ObjectId(questionBankId)
        }
      },
      {
        $group: {
          _id: {
            co: "$co",
            part: "$part",
            type: "$type"
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          co: "$_id.co",
          part: "$_id.part",
          type: "$_id.type",
          count: 1
        }
      },
      {
        $sort: { co: 1, part: 1, type: 1 }
      }
    ]);

 

    return res.status(200).json({
      success: true,
      questionBankId,
      data: result
    });

  } catch (error) {
    console.error("🔥 Count Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};