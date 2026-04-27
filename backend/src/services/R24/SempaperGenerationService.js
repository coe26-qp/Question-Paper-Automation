const ExternalQuestion = require("../../models/ExternalQuestion");

// Shuffle utility
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

async function getRandomQuestions(filter, count) {
  const questions = await ExternalQuestion.find(filter);

  if (questions.length < count) {
    throw new Error(
      `Insufficient questions for CO ${filter.co}, part ${filter.part || "any"}`
    );
  }

  return shuffle(questions).slice(0, count);
}

exports.R24SemGeneratePartA = async (subject) => {
  const partA = {};

  for (let co = 1; co <= 5; co++) {

    const [qPart1] = await getRandomQuestions(
      {
        subject,
        co,
        marks: 2,
        part: 1,
        type: "O",
        approved: true,
        frozen: false,
      },
      1
    );

    const [qPart2] = await getRandomQuestions(
      {
        subject,
        co,
        marks: 2,
        part: 2,
        type: "O",
        approved: true,
        frozen: false,
      },
      1
    );

    partA[`CO${co}`] = {
      part1: qPart1,
      part2: qPart2,
    };
  }

  return partA;
};
exports.R24SemGeneratePartB = async (subject) => {
  const partB = {};

  for (let co = 1; co <= 5; co++) {

    // a → Part 1
    const [qa] = await getRandomQuestions(
      {
        subject,
        co,
        marks: 8,
        part: 1,
        type: "D",
        level: { $in: ["L", "M", "H"] },
        approved: true,
        frozen: false,
      },
      1
    );

    // b → Part 2
    const [qb] = await getRandomQuestions(
      {
        subject,
        co,
        marks: 8,
        part: 2,
        type: "D",
        level: { $in: ["L", "M","H"] },
        approved: true,
        frozen: false,
      },
      1
    );

    // c → Part 1 OR 2
    const randomPart = Math.random() < 0.5 ? 1 : 2;

    const [qc] = await getRandomQuestions(
      {
        subject,
        co,
        marks: 8,
        part: randomPart,
        type: "D",
        level: { $in: ["L", "M","H"] },
        approved: true,
        frozen: false,
      },
      1
    );

    partB[`CO${co}`] = {
      a: qa,
      b: qb,
      c: qc,
    };
  }

  return partB;
};
