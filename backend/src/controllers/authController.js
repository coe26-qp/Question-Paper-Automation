const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Generate JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    // Temporary login expiry check (External)
    if (
      user.role === "EXTERNAL" &&
      user.loginExpiry &&
      new Date() > user.loginExpiry
    ) {
      return res.status(403).json({ message: "Login expired" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Track login time
    user.loginHistory.push({ loginTime: new Date() });
    await user.save();

    const token = generateToken(user);

    res.json({
      token,
      role: user.role,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
