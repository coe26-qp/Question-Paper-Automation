const express = require("express");
const multer = require("multer");
const router = express.Router();
const { uploadQuestionBank, getAllQuestionBanks, getBySubject, getAllQuestionPapers } = require("../controllers/questionBankController");
const { assignQuestionBank } = require("../controllers/questionBankController");
const { auth } = require("google-auth-library");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const externalAuthMiddleware = require("../middlewares/externalAuthMiddleware");
const { getAssignedQuestionBankForExternal } = require("../controllers/externalQuestionBankController");
const path = require("path");
const os = require("os");

// const upload = multer({ storage: multer.memoryStorage() });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // ✅ correct
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// 👇 Safe system folder (recommended)
const uploadDir = path.join(
  os.homedir(),
  "QuestionBankApp",
  "uploads"
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const upload = multer({storage});

router.post("/upload", authMiddleware, upload.single("file"), uploadQuestionBank);
router.get("/all", authMiddleware, roleMiddleware("EXAM_CELL"), getAllQuestionBanks);
// router.post("/assign", authMiddleware, roleMiddleware("EXAM_CELL"), assignQuestionBank);
router.post("/assign", authMiddleware, assignQuestionBank)
router.get("/by-subject/:subject", authMiddleware, getBySubject)
// router.get("/assigned-question-banks", externalAuthMiddleware, getAssignedQuestionBankForExternal);
router.get("/generated-paper-by-external", authMiddleware, getAllQuestionPapers);

module.exports = router;
