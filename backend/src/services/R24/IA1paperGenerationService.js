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
async function R24IA1GeneratePartA(subject) {
  const usedIds = [];
  const partA = {};

  // Question Mapping
  const questionMap = [
    { co: 1, part: 1 },
    { co: 1, part: 2 },
    { co: 2, part: 1 },
    { co: 2, part: 2 },
    { co: 3, part: 1 },
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


// 🔵 IA1 PART B GENERATION
async function R24IA1GeneratePartB(subject) {
  const usedIds = [];
  const partB = {};

  // Helper to fetch subdivision question
  const getSubQuestion = async (co, part) => {
    return await getRandomQuestion(
      {
        subject,
        co,
        part,
        type: "D",
        marks: 8,
        level: { $in: ["L", "M", "H"] },
        approved: true,
      },
      usedIds
    );
  };

  // -------------------
  // QUESTION 1 (CO1)
  // -------------------
  partB.Q1 = {
    a: await getSubQuestion(1, 1),
    b: await getSubQuestion(1, 2),
    c: await getSubQuestion(
      1,
      Math.random() < 0.5 ? 1 : 2
    ),
  };

  // -------------------
  // QUESTION 2 (CO2)
  // -------------------
  partB.Q2 = {
    a: await getSubQuestion(2, 1),
    b: await getSubQuestion(2, 2),
    c: await getSubQuestion(
      2,
      Math.random() < 0.5 ? 1 : 2
    ),
  };

  // -------------------
  // QUESTION 3 (CO3)
  // -------------------
  partB.Q3 = {
    a: await getSubQuestion(3, 1),
    b: await getSubQuestion(3, 1),
  };

  return partB;
}

module.exports = {
  R24IA1GeneratePartA,
  R24IA1GeneratePartB,
};


async function regenerateIA1PartA(subject) {
  return await R24IA1GeneratePartA(subject);
}

async function regenerateIA1PartB(subject) {
  return await R24IA1GeneratePartB(subject);
}
