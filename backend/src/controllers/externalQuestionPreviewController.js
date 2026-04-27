const ExternalAccess = require("../models/ExternalAccess");
const QuestionBank = require("../models/QuestionBank");
const drive = require("../config/drive");
const XLSX = require("xlsx");

const streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};

exports.previewQuestions = async (req, res) => {
  try {
    const access = await ExternalAccess.findById(req.externalAccessId);
    if (!access || !access.isActive) {
      return res.status(403).json({ error: "Access not active" });
    }

    const questionBank = await QuestionBank.findById(access.questionBankId);
    if (!questionBank) {
      return res.status(404).json({ error: "Question bank not found" });
    }

    const driveResponse = await drive.files.get(
      { fileId: questionBank.driveFileId, alt: "media" },
      { responseType: "stream" }
    );

    const buffer = await streamToBuffer(driveResponse.data);

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const questions = XLSX.utils.sheet_to_json(sheet);

    res.json({
      subject: questionBank.subject,
      totalQuestions: questions.length,
      questions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to preview questions" });
  }
};
