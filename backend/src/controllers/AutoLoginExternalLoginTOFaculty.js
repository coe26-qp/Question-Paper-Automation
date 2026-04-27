// const ExternalAccess = require("../models/ExternalAccess");
// const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs")




// exports.autoLoginExternal = async (req, res) => {
//   try {
//     const { bankId } = req.params;

//     // 1️⃣ Find active access
//     const access = await ExternalAccess.findOne({
//       questionBankId: bankId,
//       isActive: true
//     }).sort({createdAt: -1});

//     if (!access) {
//       return res.status(404).json({ message: "No active access found" });
//     }

//     // 2️⃣ Expiry check
//     if (access.expiresAt < new Date()) {
//       return res.status(401).json({ message: "Access expired" });
//     }

//     // 3️⃣ Generate token (same as login)
//     const token = jwt.sign(
//       {
//         externalAccessId: access._id,
//         questionBankId: access.questionBankId,
//         subject: access.subject
//       },
//       process.env.JWT_SECRET_EXTERNAL,
//       { expiresIn: "2h" }
//     );

//     res.json({ token });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };