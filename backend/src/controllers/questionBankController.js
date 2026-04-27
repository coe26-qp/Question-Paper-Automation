const drive = require("../config/drive");
const QuestionBank = require("../models/QuestionBank");
const { Readable } = require("stream");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ExternalAccess = require("../models/ExternalAccess");
const QuestionPaper = require("../models/QuestionPaper");
// const QuestionBank = require("../models/QuestionBank");

// exports.uploadQuestionBank = async (req, res) => {
//   try {
//     // console.log("REQ.USER =>", req.user);
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const bufferStream = new Readable();
//     bufferStream.push(req.file.buffer);
//     bufferStream.push(null);

//     const response = await drive.files.create({
//       requestBody: {
//         name: req.file.originalname,
//         parents: [process.env.DRIVE_FOLDER_ID],
//       },
//       media: {
//         mimeType: req.file.mimetype,
//         body: bufferStream,
//       },
//       fields: "id, webViewLink",
//     });

//     const questionBank = await QuestionBank.create({
//       subject: req.body.subject,
//       driveFileId: response.data.id,
//       driveFileLink: response.data.webViewLink,
//       uploadedBy: req.user._id,
//     });

//     res.status(201).json({
//       message: "Question bank uploaded successfully to Google Drive",
//       data: questionBank,
//     });
//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.uploadQuestionBank = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const bufferStream = new Readable();
//     bufferStream.push(req.file.buffer);
//     bufferStream.push(null);

//     const response = await drive.files.create({
//       requestBody: {
//         name: req.file.originalname,
//         parents: [process.env.DRIVE_FOLDER_ID],
//       },
//       media: {
//         mimeType: req.file.mimetype,
//         body: bufferStream,
//       },
//       fields: "id, webViewLink",
//     });

//     // 🔥 NEW PART — Save exam details
//     const questionBank = await QuestionBank.create({
//       subject: req.body.subject,
//       courseName: req.body.courseName,
//       // examDetails: {
//       //   session: req.body.session,
//       //   year: req.body.year,
//       //   degreeBranch: req.body.degreeBranch,
//       //   courseName: req.body.courseName,
//       //   time: req.body.time || "3 Hours",
//       //   maxMarks: req.body.maxMarks,
//       //   examDate: req.body.examDate,
//       // },

//       driveFileId: response.data.id,
//       driveFileLink: response.data.webViewLink,
//       uploadedBy: req.user._id,
//     });

//     res.status(201).json({
//       message: "Question bank uploaded successfully",
//       data: questionBank,
//     });

//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


exports.uploadQuestionBank = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🔥 File stored locally
    const filePath = req.file.path;

    const questionBank = await QuestionBank.create({
      subject: req.body.subject,
      courseName: req.body.courseName,

      fileName: req.file.originalname,
      filePath: filePath, // instead of Drive link

      uploadedBy: req.user._id,
    });

    res.status(201).json({
      message: "Question bank uploaded successfully",
      data: questionBank,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllQuestionBanks = async (req, res) => {
  try {
    const banks = await QuestionBank.find()
      .populate("uploadedBy", "username role")
    // .populate("assignedTo", "username role");

    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// exports.assignQuestionBank = async (req, res) => {
//   try {
//     const { questionBankId, facultyId } = req.body;

//     if (!questionBankId || !facultyId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const faculty = await User.findById(facultyId);

//     if (!faculty || faculty.role !== "EXTERNAL") {
//       return res.status(400).json({ message: "Invalid faculty user" });
//     }

//     const questionBank = await QuestionBank.findById(questionBankId);

//     if (!questionBank) {
//       return res.status(404).json({ message: "Question bank not found" });
//     }

//     questionBank.assignedTo = facultyId;
//     questionBank.status = "ASSIGNED";
//     await questionBank.save();

//     res.status(200).json({
//       message: "Question bank assigned successfully",
//       questionBank,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// GET /api/question-banks/by-subject/:subject
exports.getBySubject = async (req, res) => {
  try {
    const banks = await QuestionBank.find({
      subject: req.params.subject,
      // status: "UPLOADED"
    });

    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// exports.assignQuestionBank = async (req, res) => {
//   // console.log(req.body);

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
//     // const expiresAt = new Date();
//     // expiresAt.setHours(expiresAt.getHours() + 100);

//     // 🔹 Save External Access
//     const access = await ExternalAccess.create({
//       subject,
//       questionBankId,
//       examinerName,
//       examinerEmail,
//       tempUserId,
//       tempPasswordHash: hashedPassword,
//       // expiresAt,
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
//       // expiresAt
//     });

//   } catch (error) {
//     console.error("ASSIGN ERROR:", error);
//     res.status(500).json({ error: error.message });
//   }
// };





exports.assignQuestionBank = async (req, res) => {
  try {
    const {
      subject,
      questionBankId,
      examinerName,
      examinerEmail
    } = req.body;

    if (!subject || !questionBankId || !examinerName || !examinerEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🔹 Verify Question Bank
    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({ error: "Question bank not found" });
    }

    // 🔹 Generate temp credentials
    const tempUserId = `EXT-${crypto.randomBytes(3).toString("hex")}`;
    const tempPassword = crypto.randomBytes(4).toString("hex");

    // 🔹 Save External Access (NO HASHING, NO EXPIRY)
    const access = await ExternalAccess.create({
      subject,
      questionBankId,
      examinerName,
      examinerEmail,
      tempUserId,
      tempPassword, // storing plain password
      createdBy: req.user.id
    });

    // 🔹 Update Question Bank
    questionBank.status = "ASSIGNED";
    await questionBank.save();

    // 🔹 Return credentials (ONLY ONCE)
    res.status(201).json({
      message: "Question bank assigned successfully",
      tempUserId,
      tempPassword
    });

  } catch (error) {
    console.error("ASSIGN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};


// GET all question papers for Exam Cell
exports.getAllQuestionPapers = async (req, res) => {
  try {
    const papers = await QuestionPaper.find()
      .select("subject createdBy status generatedAt pattern")
      .sort({ generatedAt: -1 });

    res.status(200).json({
      success: true,
      count: papers.length,
      data: papers,
    });
  } catch (error) {
    console.error("Exam Cell Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch question papers",
    });
  }
};