const { default: mongoose } = require("mongoose");
const ExternalAccess = require("../models/ExternalAccess");
const QuestionBank = require("../models/QuestionBank");
const parseQuestionExcel = require("../utils/parseQuestionExcel");
const downloadExcelFromDrive = require("../services/downloadExcelFromDrive");
// const parseQuestionExcel = require("../utils/parseQuestionExcel");
const ExternalQuestion = require("../models/ExternalQuestion");
const extractUsingPython = require("../services/extractUsingPython");

exports.getAssignedQuestionBankForExternal = async (req, res) => {
  try {
    const { externalAccessId, questionBankId } = req.external;
    // console.log(questionBankId);


    // // 1️⃣ Validate external access (security check)
    const access = await ExternalAccess.findOne({
      _id: externalAccessId,
      isActive: true,
      // expiresAt: { $gt: new Date() }
    });

    if (!access) {
      return res.status(403).json({
        error: "External access expired or inactive"
      });
    }

    const questionBank = await QuestionBank.findById(questionBankId);
    if (!questionBank) {
      return res.status(404).json({
        error: "Question bank not found"
      });
    }

    // 3️⃣ Success response
    res.status(200).json({
      subject: access.subject,
      courseName: access.courseName,
      examinerName: access.examinerName,
      examinerEmail: access.examinerEmail,
      questionBank
    });

  } catch (error) {
    console.error("External fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.extractQuestionsForExternal = async (req, res) => {
//   try {
//     const { questionBankId } = req.external;

//     // 1️⃣ Get assigned question bank
//     const bank = await QuestionBank.findById(questionBankId);
//     if (!bank) {
//       return res.status(404).json({ error: "Question bank not found" });
//     }

//     // 2️⃣ Download Excel from Drive
//     const buffer = await downloadExcelFromDrive(bank.driveFileId);

//     // 3️⃣ Parse questions
//     const questions = parseQuestionExcel(buffer);

//     res.status(200).json({
//       subject: bank.subject,
//       totalQuestions: questions.length,
//       questions,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };






exports.extractQuestionsForExternal = async (req, res) => {
  try {
    const { questionBankId, _id: examinerId } = req.external;
    // console.log(req.external);


    // 1️⃣ Get assigned question bank
    const bank = await QuestionBank.findById(questionBankId);
    if (!bank) {
      return res.status(404).json({ error: "Question bank not found" });
    }

    // 2️⃣ Download Excel from Drive
    // const buffer = await downloadExcelFromDrive(bank.driveFileId);

    const filePath = bank.filePath;

    // 3️⃣ Parse questions using node js for text
    // const parsedQuestions = parseQuestionExcel(buffer);

    //  Parse questions using python for images
    // const parsedQuestions = await extractUsingPython(buffer);
    const parsedQuestions = await extractUsingPython(filePath);


    // 4️⃣ Remove old questions (important!)
    await ExternalQuestion.deleteMany({ questionBankId });

    // 5️⃣ Prepare MongoDB documents
    // const questionsToSave = parsedQuestions.map((q, index) => ({
    //   questionBankId,
    //   examinerId,
    //   subject: bank.subject,

    //   questionId: index + 1,
    //   co: q.co,
    //   unitTitle: q.unit_title,
    //   type: normalizedType,
    //   part: q.part,
    //   question: q.question,
    //   questionImage: q.questionImage,
    //   marks: q.marks,
    //   // bloomsTaxonomy: q.bloomsTaxonomy,
    //   bloomsTaxonomy: q.bt,
    //   level: q.level,

    //   status: "PENDING",
    //   approved: false,
    //   frozen: false
    // }));

    const questionsToSave = parsedQuestions.map((q, index) => ({
      questionBankId,
      examinerId,
      subject: bank.subject,

      questionId: index + 1,
      co: q.co,
      unitTitle: q.unit_title,
      type: q.type, // already normalized in python
      part: q.part,

      question: q.questionText,       // TEXT
      questionImage: q.questionImage, // IMAGE

      marks: q.marks,
      bloomsTaxonomy: q.bt,
      level: q.level,

      status: "PENDING",
      approved: false,
      frozen: false
    }));

    // 6️⃣ Save to MongoDB
    const savedQuestions = await ExternalQuestion.insertMany(questionsToSave);

    // 7️⃣ Return SAVED questions
    res.status(200).json({
      subject: bank.subject,
      totalQuestions: savedQuestions.length,
      questions: savedQuestions
    });

  } catch (error) {
    console.error("Extract error:", error);
    res.status(500).json({ error: error.message });
  }
};



// const ExternalQuestion = require("../models/ExternalQuestion");

exports.getExtractedQuestionsForExternal = async (req, res) => {
  try {
    const { questionBankId } = req.external;

    const questions = await ExternalQuestion.find({ questionBankId })
      .sort({ questionId: 1 });

    res.status(200).json({
      total: questions.length,
      questions
    });

  } catch (error) {
    console.error("Fetch questions error:", error);
    res.status(500).json({ error: "Failed to load questions" });
  }
};
