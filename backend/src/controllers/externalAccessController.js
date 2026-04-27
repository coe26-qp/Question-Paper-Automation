// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
// const ExternalAccess = require("../models/ExternalAccess");
// const QuestionBank = require("../models/QuestionBank");

// exports.assignQuestionBank = async (req, res) => {
//   console.log(req.body);
  
//   try {
//     const {
//       subject,
//       questionBankId,
//       examinerName,
//       examinerEmail
//     } = req.body;

//     if (!subject || !questionBankId || !examinerName || !examinerEmail) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // 🔹 Verify Question Bank
//     const questionBank = await QuestionBank.findById(questionBankId);
//     if (!questionBank) {
//       return res.status(404).json({ error: "Question bank not found" });
//     }

//     // 🔹 Generate temp credentials
//     const tempUserId = `EXT-${crypto.randomBytes(3).toString("hex")}`;
//     const tempPassword = crypto.randomBytes(4).toString("hex");

//     const hashedPassword = await bcrypt.hash(tempPassword, 10);

//     // 🔹 Expiry (example: 48 hours)
//     const expiresAt = new Date();
//     expiresAt.setHours(expiresAt.getHours() + 48);

//     // 🔹 Save External Access
//     const access = await ExternalAccess.create({
//       subject,
//       questionBankId,
//       examinerName,
//       examinerEmail,
//       tempUserId,
//       tempPasswordHash: hashedPassword,
//       expiresAt,
//       createdBy: req.user.id // Exam Cell
//     });

//     // 🔹 Update Question Bank
//     questionBank.status = "ASSIGNED";
//     await questionBank.save();

//     // 🔹 Return credentials (ONLY ONCE)
//     res.status(201).json({
//       message: "Question bank assigned successfully",
//       tempUserId,
//       tempPassword,
//       expiresAt
//     });

//   } catch (error) {
//     console.error("ASSIGN ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
