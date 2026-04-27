const express = require("express");
const router = express.Router();
const externalAuth = require("../middlewares/externalAuthMiddleware");
const {
  previewQuestions,
} = require("../controllers/externalQuestionPreviewController");

router.get("/preview", externalAuth, previewQuestions);

module.exports = router;
