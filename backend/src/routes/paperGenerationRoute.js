const express = require('express');
const router = express.Router();
const externalAuthMiddleware = require('../middlewares/externalAuthMiddleware');
// const { paperGenerationController } = require('../controllers/paperGenerationController');
const {generateQuestionPaper, generateOnlyPartA, generateOnlyPartB, fetchQuestionPaper, fetchGeneratedQuestionPaperForExamCell} = require('../controllers/paperGenerationController');
const { route } = require('./authRoutes');
const authMiddleware = require('../middlewares/authMiddleware');
// const { route } = require('./authRoutes');

router.post("/generate", externalAuthMiddleware, generateQuestionPaper);

router.post("/generate/partA/:paperId", externalAuthMiddleware, generateOnlyPartA);
router.post("/generate/partB/:paperId", externalAuthMiddleware, generateOnlyPartB);
// router.post("/generate/partC/:paperId", externalAuthMiddleware, generateOnlyPartC);

router.get("/fetchQuestionPaper/:paperId", externalAuthMiddleware, fetchQuestionPaper);
router.get("/examcell/fetchQuestionPaper/:id", authMiddleware, fetchGeneratedQuestionPaperForExamCell);

// router.post("/regenerate-ia1", externalAuthMiddleware, generateQuestionPaper.regenerateIA1Section);
module.exports = router;