const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const QuestionBank = require("../models/QuestionBank");
const ExternalAccess = require("../models/ExternalAccess");
const ExternalQuestion = require("../models/ExternalQuestion");
const User = require("../models/User")
// const { google } = require("googleapis")
const drive = require("../config/drive")

// REMOVE ASSIGNMENT
router.delete("/question-bank/remove-assignment/:bankId", async (req, res) => {
  try {
    const { bankId } = req.params;

    // 1️⃣ Delete external login
    await ExternalAccess.findOneAndDelete({
      questionBankId: bankId
    });

    // 2️⃣ Reset question bank status
    const bank = await QuestionBank.findByIdAndUpdate(
      bankId,
      { status: "UPLOADED" },
      { new: true }
    );

    if (!bank) {
      return res.status(404).json({ error: "Question bank not found" });
    }

    res.json({ message: "Assignment removed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove assignment" });
  }
});


// router.delete("/question-bank/delete/:bankId", async (req, res) => {

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { bankId } = req.params;

//     const bank = await QuestionBank.findById(bankId).session(session);
//     if (!bank) throw new Error("Question bank not found");

//     // 🔴 If ASSIGNED → delete external user & access
//     if (bank.status === "ASSIGNED") {

//       const externalAccess = await ExternalAccess.findOne({
//         questionBankId: bankId
//       }).session(session);

//       if (externalAccess) {

//         // 1️⃣ Delete temp login user (if stored in User collection)
//         await User.deleteOne(
//           { username: externalAccess.tempUserId },
//           { session }
//         );

//         // 2️⃣ Delete ExternalAccess record
//         await ExternalAccess.deleteOne(
//           { _id: externalAccess._id },
//           { session }
//         );
//       }
//     }

//     // 3️⃣ Delete extracted questions
//     await ExternalQuestion.deleteMany(
//       { questionBankId: bankId },
//       { session }
//     );

//     // 4️⃣ Delete Question Bank
//     await QuestionBank.deleteOne(
//       { _id: bankId },
//       { session }
//     );

//     await session.commitTransaction();
//     session.endSession();

//     res.json({
//       message: "Question bank and all related data deleted successfully"
//     });

//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();

//     console.error(err);
//     res.status(500).json({
//       error: err.message || "Delete failed"
//     });
//   }
// });



// router.delete("/question-bank/delete/:bankId", async (req, res) => {

//   const session = await mongoose.startSession();

//   try {
//     const { bankId } = req.params;

//     session.startTransaction();

//     const bank = await QuestionBank.findById(bankId).session(session);
//     if (!bank) throw new Error("Question bank not found");

//     const driveFileId = bank.driveFileId;

//     // 🔴 If ASSIGNED → delete ALL external users & access
//     if (bank.status === "ASSIGNED") {

//       const externalAccessList = await ExternalAccess.find({
//         questionBankId: bankId
//       }).session(session);

//       for (const access of externalAccessList) {

//         // 1️⃣ Delete temp login user (if stored in User collection)
//         await User.deleteOne(
//           { username: access.tempUserId },
//           { session }
//         );

//         // 2️⃣ Delete ExternalAccess record
//         await ExternalAccess.deleteOne(
//           { _id: access._id },
//           { session }
//         );
//       }
//     }

//     // 3️⃣ Delete extracted questions
//     await ExternalQuestion.deleteMany(
//       { questionBankId: bankId },
//       { session }
//     );

//     // 4️⃣ Delete Question Bank
//     await QuestionBank.deleteOne(
//       { _id: bankId },
//       { session }
//     );

//     // ✅ Commit DB changes FIRST
//     await session.commitTransaction();
//     session.endSession();

//     // 🔥 AFTER DB SUCCESS → Delete Drive file
//     if (driveFileId) {
//       try {
//         await drive.files.delete({
//           fileId: driveFileId,
//         });
//         console.log("Drive file deleted successfully");
//       } catch (driveError) {
//         console.error("Drive delete failed:", driveError.message);
//         // Do NOT throw error (DB already clean)
//       }
//     }

//     res.json({
//       message: "Question bank and all related data deleted successfully"
//     });

//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();

//     console.error(err);
//     res.status(500).json({
//       error: err.message || "Delete failed"
//     });
//   }
// });





router.delete("/question-bank/delete/:bankId", async (req, res) => {
  try {
    const { bankId } = req.params;

    // 1️⃣ Find bank
    const bank = await QuestionBank.findById(bankId);
    if (!bank) {
      return res.status(404).json({ error: "Question bank not found" });
    }

    // 🆕 (optional) local file path
    const filePath = bank.filePath;

    // 🔴 If ASSIGNED → delete ALL external users & access
    if (bank.status === "ASSIGNED") {
      const externalAccessList = await ExternalAccess.find({
        questionBankId: bankId,
      });

      for (const access of externalAccessList) {

        // 1️⃣ Delete temp login user
        await User.deleteOne({ username: access.tempUserId });

        // 2️⃣ Delete ExternalAccess record
        await ExternalAccess.deleteOne({ _id: access._id });
      }
    }

    // 3️⃣ Delete extracted questions
    await ExternalQuestion.deleteMany({ questionBankId: bankId });

    // 4️⃣ Delete Question Bank
    await QuestionBank.deleteOne({ _id: bankId });

    // 🆕 5️⃣ Delete LOCAL file (VERY IMPORTANT)
    if (filePath) {
      const fs = require("fs");

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("File delete failed:", err.message);
        } else {
          console.log("Local file deleted successfully");
        }
      });
    }

    res.json({
      message: "Question bank and all related data deleted successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Delete failed",
    });
  }
});






module.exports = router;