// require("dotenv").config();
// const { spawn } = require("child_process");
// const path = require("path");
// const app = require("./app");
// const connectDB = require("./config/db");

// const PORT = process.env.PORT || 5000;

// // 🔹 Start Python Microservice
// const pythonProcess = spawn("python", [
//   path.join(__dirname, "../python-service/app.py")
// ]);

// pythonProcess.stdout.on("data", (data) => {
//   console.log(`🐍 Python: ${data.toString()}`);
// });

// pythonProcess.stderr.on("data", (data) => {
//   console.error(`🐍 Python Error: ${data.toString()}`);
// });

// // 🔹 Connect DB
// connectDB();

// // 🔹 Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});