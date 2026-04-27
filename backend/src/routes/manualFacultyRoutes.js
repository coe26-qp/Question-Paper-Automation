const express = require("express");
const router = express.Router();
const { createManualFaculty, loginManualFaculty, addManualQuestion } = require("../controllers/manualFacultyController");
const authMiddleware = require("../middlewares/authMiddleware")


// Only EXAM_CELL should access
router.post("/create", authMiddleware, createManualFaculty);
router.post("/login", loginManualFaculty);
router.post("/add-question", authMiddleware, addManualQuestion);

module.exports = router;