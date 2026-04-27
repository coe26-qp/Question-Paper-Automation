const { R24SemGeneratePartA, R24SemGeneratePartB } = require("../services/R24/SempaperGenerationService");
const QuestionPaper = require("../models/QuestionPaper");
const { R24IA1GeneratePartA, R24IA1GeneratePartB } = require("../services/R24/IA1paperGenerationService");
const { R20IA1GeneratePartA, R20IA1GeneratePartB } = require("../services/R20/IA1paperGenerationService")
const { R20IA2GeneratePartA, R20IA2GeneratePartB } = require("../services/R20/IA2paperGenerationService");
const { R24IA2GeneratePartA, R24IA2GeneratePartB } = require("../services/R24/IA2paperGenerationService");


/* ================= FULL PAPER ================= */
exports.generateQuestionPaper = async (req, res) => {
  try {
    const { subject, externalAccessId } = req.external;
    // const { pattern = "SEMESTER" } = req.body;
    // const { pattern } = req.body;
    const { pattern, year, degree, branch, courseName, date, semester } = req.body;



    console.log("SUBJECT: ", subject);
    // console.log("USER ID: ", userId);
    console.log("Pattern: ", pattern);
    console.log("Exam Details: \n", year, degree, branch, courseName, date, semester);

        if (!year || !degree || !branch || !courseName || !semester) {
      return res.status(400).json({
        error: "Year, Degree and Branch are required"
      });
    }

    // const externals = req.external;
    // console.log(externals);


    if (!subject) {
      return res.status(400).json({ error: "Subject is required" });
    }

    // const partA = await generatePartA(subject);
    // const partB = await generatePartB(subject);
    // const partC = await generatePartC(subject);

    let partA = [];
    let partB = [];
    let partC = [];

    // if (pattern === "R24SEM") {
    //   partA = await R24SemGeneratePartA(subject);
    //   partB = await R24SemGeneratePartB(subject);
    // }

    // else if (pattern === "R24IA1") {
    //   // TEMP: reuse semester logic for now
    //   partA = await R24IA1GeneratePartA(subject);
    //   partB = await R24IA1GeneratePartB(subject);
    // }

    // else if (pattern === "R20IA1") {
    //   partA = await R20IA1GeneratePartA(subject);
    //   partB = await R20IA1GeneratePartB(subject);
    // }

    // else if (pattern === "R20IA2") {
    //   partA = await R20IA2GeneratePartA(subject);
    //   partB = await R20IA2GeneratePartB(subject);
    // }

    // else if (pattern === "R20SEM") {

    // }


    if(pattern === "R20IA1"){
      partA = await R20IA1GeneratePartA(subject);
      partB = await R20IA1GeneratePartB(subject);
    }

    else if(pattern == "R20IA2"){
      partA = await R20IA2GeneratePartA(subject);
      partB = await R20IA2GeneratePartB(subject);
    }

    else if(pattern == "R20SEM"){
      null
    }

    else if(pattern == "R24IA1"){
      partA = await R24IA1GeneratePartA(subject);
      partB = await R24IA1GeneratePartB(subject);
    }

    else if(pattern == "R24IA2"){
      partA = await R24IA2GeneratePartA(subject);
      partB = await R24IA2GeneratePartB(subject);
    }

    else if(pattern == "R24SEM"){
      partA = await R24SemGeneratePartA(subject);
      partB = await R24SemGeneratePartB(subject);
    }


    // Save question paper in DB
    const paper = await QuestionPaper.create({
      subject,
      createdBy: externalAccessId,
      // 🔥 NEW FIELDS
      examDetails: {
        year,
        degree,
        branch,
        semester,
        courseName, date
      },
      pattern,
      partA,
      partB,
      partC,
    })

    console.log("Paper Stored to in DB");

    // res.status(200).json({
    //   subject,
    //   generatedAt: new Date(),
    //   partA,
    //   partB,
    //   partC,
    // });

    res.status(200).json({
      paperId: paper._id,
      subject: paper.subject,
      generatedAt: paper.generatedAt,
      partA: paper.partA,
      partB: paper.partB,
      partC: paper.partC,

    })
  } catch (error) {
    console.error("Paper generation error:", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};


/* ================= PART A ONLY ================= */
// exports.generateOnlyPartA = async (req, res) => {
//   try {
//     const { subject } = req.external;

//     const partA = await generatePartA(subject);

//     res.status(200).json({ partA });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.generateOnlyPartA = async (req, res) => {
  try {
    const { paperId } = req.params;
    const { subject } = req.external;

    const paper = await QuestionPaper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ error: "Paper not found" });
    }

    let newPartA;
    // 🔄 Regenerate
    // const newPartA = await SemGeneratePartA(subject);

    // if (paper.pattern == "R24SEM") {
    //   newPartA = await R24SemGeneratePartA(subject);
    // }

    // if (paper.pattern == "R24IA1") {
    //   newPartA = await R24IA1GeneratePartA(subject);
    // }

    // if (paper.pattern == "R20IA1") {
    //   newPartA = await R20IA1GeneratePartA(subject);
    // }

    // if (paper.pattern == "R20IA2") {
    //   newPartA = await R20IA2GeneratePartA(subject);
    // }

    if(paper.pattern == "R20IA1"){
      newPartA = await R20IA1GeneratePartA(subject);
    }

    if(paper.pattern == "R20IA2"){
      newPartA = await R20IA2GeneratePartA(subject);
    }

    if(paper.pattern == "R24IA1"){
      newPartA = await R24IA1GeneratePartA(subject);
    }

    if(paper.pattern == "R24IA2"){
      newPartA = await R24IA2GeneratePartA(subject);
    }

    if(paper.pattern == "R24SEM"){
      newPartA = await R24SemGeneratePartA(subject);
    }

    // 💾 Update only Part A
    paper.partA = newPartA;
    await paper.save();

    res.status(200).json({
      partA: paper.partA,
      paperId: paper._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/* ================= PART B ONLY ================= */
// exports.generateOnlyPartB = async (req, res) => {
//   try {
//     const { subject } = req.external;

//     const partB = await generatePartB(subject);

//     res.status(200).json({ partB });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.generateOnlyPartB = async (req, res) => {
  try {
    const { paperId } = req.params;
    const { subject } = req.external;

    const paper = await QuestionPaper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ error: "Paper not found" });
    }

    // const newPartB = await SemGeneratePartB(subject);
    let newPartB;

    // if (paper.pattern == "R24SEM") {
    //   newPartB = await R24SemGeneratePartB(subject);
    // }

    // if (paper.pattern == "R24IA1") {
    //   newPartB = await R24IA1GeneratePartB(subject);
    // }

    // if (paper.pattern == "R20IA1") {
    //   newPartB = await R20IA1GeneratePartB(subject);
    // }

    // if (paper.pattern == "R20IA2") {
    //   newPartB = await R20IA2GeneratePartB(subject);
    // }


    if(paper.pattern == "R20IA1"){
      newPartB = await R20IA1GeneratePartB(subject);
    }

    if(paper.pattern == "R20IA2"){
      newPartB = await R20IA2GeneratePartB(subject);
    }

    if(paper.pattern == "R24IA1"){
      newPartB = await R24IA1GeneratePartB(subject);
    }

    if(paper.pattern == "R24IA2"){
      newPartB = await R24IA2GeneratePartB(subject);
    }

    if(paper.pattern == "R24SEM"){
      newPartB = await R24SemGeneratePartB(subject);
    }


    paper.partB = newPartB;
    await paper.save();

    res.status(200).json({
      partB: paper.partB,
      paperId: paper._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ================= PART C ONLY ================= */
// exports.generateOnlyPartC = async (req, res) => {
//   try {
//     const { subject } = req.external;

//     const partC = await generatePartC(subject);

//     res.status(200).json({ partC });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.generateOnlyPartC = async (req, res) => {
//   try {
//     const externals = req.external;
//     // console.log(externals);
//     const { paperId } = req.params;
//     const { subject } = req.external;

//     const paper = await QuestionPaper.findById(paperId);
//     if (!paper) {
//       return res.status(404).json({ error: "Paper not found" });
//     }

//     const newPartC = await SemGeneratePartC(subject);

//     paper.partC = newPartC;
//     await paper.save();

//     res.status(200).json({
//       partC: paper.partC,
//       paperId: paper._id,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };





/* ================= FETCH STORED QUESTION PAPER ================= */
exports.fetchQuestionPaper = async (req, res) => {
  try {
    const { paperId } = req.params;
    const { externalAccessId } = req.external;

    if (!paperId) {
      return res.status(400).json({ error: "Paper ID is required" });
    }

    const paper = await QuestionPaper.findOne({
      _id: paperId,
      createdBy: externalAccessId,
    });

    if (!paper) {
      return res.status(404).json({
        error: "Question paper not found",
      });
    }

    res.status(200).json(paper);
  } catch (error) {
    console.error("Fetch paper error:", error.message);
    res.status(500).json({
      error: "Failed to fetch question paper",
    });
  }
};


exports.regenerateIA1Section = async (req, res) => {
  try {
    const { paperId, section } = req.body;

    const paper = await QuestionPaper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    let updatedSection;

    if (section === "partA") {
      updatedSection = await regenerateIA1PartA(paper.subject);
      paper.partA = updatedSection;
    }

    if (section === "partB") {
      updatedSection = await regenerateIA1PartB(paper.subject);
      paper.partB = updatedSection;
    }

    await paper.save();

    res.status(200).json({
      message: "Section regenerated successfully",
      updatedSection,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// For Exam Cell preview (no ownership restriction)
exports.fetchGeneratedQuestionPaperForExamCell = async (req, res) => {
  try {
    const paper = await QuestionPaper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.status(200).json(paper);
  } catch (error) {
    console.error("Exam Cell Fetch Paper Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
