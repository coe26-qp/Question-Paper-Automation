const express = require("express");
const router = express.Router();
const externalAuthMiddleware = require("../middlewares/externalAuthMiddleware");
const {
  getAssignedQuestionBankForExternal,
  getExtractedQuestionsForExternal,
} = require("../controllers/externalQuestionBankController");

const { extractQuestionsForExternal } = require("../controllers/externalQuestionBankController");

router.get("/assigned-question-bank", externalAuthMiddleware, getAssignedQuestionBankForExternal);
router.get("/extract-questions", externalAuthMiddleware, extractQuestionsForExternal);
router.get("/fetch-extracted-questions", externalAuthMiddleware, getExtractedQuestionsForExternal);


module.exports = router;
