const express = require("express");
const cors = require("cors");



app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.options("*", cors());


// const questionExtraction = require("./routes/questionExtractionRoute")
const authRoutes = require("./routes/authRoutes");
const questionBankRoutes = require("./routes/questionBankRoutes");
// const externalAccessroutes = require("./routes/externalAccessRoutes");
const externalAuthRoutes = require("./routes/externalAuthRoutes");
const externalQuestionBankRoutes = require("./routes/externalQuestionBankRoutes");
// const externalQuestionPreviewRoutes = require("./routes/externalQuestionPreviewRoutes");
const externalAccessRoute = require("./routes/externalAccessRoute");
const paperGenerationRoute = require("./routes/paperGenerationRoute")
const tempRemoveRoute = require("./routes/tempRemoveRoute")
const manualFacultyRoutes = require("./routes/manualFacultyRoutes")
// const autoLoginRoute = require("./routes/AutoLoginRoute");

require("./models/User");
require("./models/QuestionBank");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/question-bank", questionBankRoutes);
app.use("/api/external-auth", externalAuthRoutes);
app.use("/api/external-access", externalQuestionBankRoutes);
// app.use("/api/external/questions", externalQuestionPreviewRoutes);
app.use("/api/external/questions", externalAccessRoute);
app.use("/api/paper-generation", paperGenerationRoute);
app.use("/api", tempRemoveRoute);
app.use("/api/manual-faculty", manualFacultyRoutes);
// app.use("/api/external", autoLoginRoute);
// app.use("/api/questionExtraction", questionExtraction);

// Test Route
app.get("/", (req, res) => {
  res.send("Question Paper Automation API is running 🚀");
});

module.exports = app;
