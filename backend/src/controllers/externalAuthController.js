const ExternalAccess = require("../models/ExternalAccess");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.externalLogin = async (req, res) => {
  try {
    const { tempUserId, password } = req.body;

    if (!tempUserId || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    // 1️⃣ Find active external access
    const access = await ExternalAccess.findOne({
      tempUserId,
      isActive: true
    });

    if (!access) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Expiry check
    // if (access.expiresAt < new Date()) {
    //   access.isActive = false;
    //   await access.save();

    //   return res.status(401).json({
    //     message: "Access expired. Contact exam cell."
    //   });
    // }

    // // 3️⃣ Password check
    // const isMatch = await bcrypt.compare(
    //   password,
    //   access.tempPasswordHash
    // );

    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    // 4️⃣ Generate JWT (EXTERNAL ONLY)
    const token = jwt.sign(
      {
        externalAccessId: access._id,
        questionBankId: access.questionBankId,
        subject: access.subject
      },
      process.env.JWT_SECRET_EXTERNAL,
      { expiresIn: "2h" }
    );

    // 5️⃣ Success
    res.status(200).json({
      token,
      examinerName: access.examinerName,
      subject: access.subject
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getExternalAccessList = async (req, res) => {
  try {
    const data = await ExternalAccess.find()
      .select("subject examinerName examinerEmail tempUserId tempPassword");

    res.status(200).json({
      message: "External access fetched successfully",
      data
    });

  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};