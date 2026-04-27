const express = require("express");
const router = express.Router();

// const externalAuth = require("../middlewares/externalAuthMiddleware");
// const controller = require("../controllers/externalQuestionController");
const externalAuthMiddleware = require("../middlewares/externalAuthMiddleware");
const {updateExternalQuestion, approveExternalQuestion, freezeExternalQuestion, getApprovedCountDetailed, deApproveExternalQuestion} = require("../controllers/externalQuestionController");

router.put("/:id", externalAuthMiddleware, updateExternalQuestion);
router.put("/:id/approve", externalAuthMiddleware, approveExternalQuestion);
router.put("/:id/freeze", externalAuthMiddleware, freezeExternalQuestion);
router.get("/approved-count", externalAuthMiddleware, getApprovedCountDetailed);
router.put("/:id/deapprove",externalAuthMiddleware, deApproveExternalQuestion);

module.exports = router;
