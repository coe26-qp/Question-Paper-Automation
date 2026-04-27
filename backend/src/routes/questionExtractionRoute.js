const express = require("express");
const multer = require("multer");
const { extractQuestions } = require("../controllers/questionExtraction");

const router = express.Router();
const upload = multer();

router.post("/extract", upload.single("file"), extractQuestions);

module.exports = router;