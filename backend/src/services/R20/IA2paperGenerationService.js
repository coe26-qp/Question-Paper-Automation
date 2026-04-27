const Question = require("../../models/ExternalQuestion"); // adjust path if needed

// 🔹 COMMON RANDOM QUESTION FETCHER
async function getRandomQuestion(filter, usedIds) {
  const questions = await Question.find({
    ...filter,
    _id: { $nin: usedIds }, // prevent duplicates
  });

  if (!questions.length) {
    throw new Error("Not enough approved questions available for given criteria");
  }

  const randomIndex = Math.floor(Math.random() * questions.length);
  const selected = questions[randomIndex];

  usedIds.push(selected._id); // track used question

  return selected;
}


// 🔵 IA1 PART A GENERATION
async function R20IA2GeneratePartA(subject) {
  const usedIds = [];
  const partA = {};

  // Question Mapping
  const questionMap = [
    { co: 3, part: 2 },
    { co: 4, part: 1 },
    { co: 4, part: 2 },
    { co: 5, part: 1 },
    { co: 5, part: 2 },
  ];

  for (let i = 0; i < questionMap.length; i++) {
    const { co, part } = questionMap[i];

    const question = await getRandomQuestion(
      {
        subject,
        co,
        part,
        type: "O",
        marks: 2,
        approved: true,
      },
      usedIds
    );

    partA[`Q${i + 1}`] = question;
  }

  return partA;
}

// 🔵 NEW IA1 PART B (Either / Or Pattern)
async function R20IA2GeneratePartB(subject) {
  const usedIds = [];
  const partB = {};

  // Common Fetcher
  const getQuestion = async (co, part, marks) => {
    return await getRandomQuestion(
      {
        subject,
        co,
        part,
        type: "D",
        marks,
        approved: true,
        frozen: false
      },
      usedIds
    );
  };

  // -------------------
  // Q1 -> CO1 (16 Marks)
  // -------------------
  partB.Q1 = {
    a: await getQuestion(5, 1, 16),
    b: await getQuestion(5, 2, 16)
  };

  // -------------------
  // Q2 -> CO2 (16 Marks)
  // -------------------
  partB.Q2 = {
    a: await getQuestion(4, 1, 16),
    b: await getQuestion(4, 2, 16)
  };

  // -------------------
  // Q3 -> CO3 (8 Marks)
  // Same filter but different questions
  // -------------------
  partB.Q3 = {
    a: await getQuestion(3, 2, 8),
    b: await getQuestion(3, 2, 8)
  };

  return partB;
}

module.exports = {
  R20IA2GeneratePartA,
  R20IA2GeneratePartB,
}

async function regenerateIA2PartA(subject){
  await R20IA2GeneratePartA(subject);
}

async function regenerateIA2PartB(subject){
  await R20IA2GeneratePartB(subject);
}