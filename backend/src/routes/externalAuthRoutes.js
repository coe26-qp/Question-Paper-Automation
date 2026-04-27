const express = require("express");
const router = express.Router();
const {
  externalLogin,
  getExternalAccessList,
} = require("../controllers/externalAuthController");
const externalAuthMiddleware = require("../middlewares/externalAuthMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
// const externalAuthMiddleware = require("../middlewares/externalAuthMiddleware");
// const { getAssignedQuestionBankForExternal } = require("../controllers/externalQuestionBankController");


router.post("/login", externalLogin);
router.get("/externalAccessIDPassword", authMiddleware, getExternalAccessList);


module.exports = router;
