const XLSX = require("xlsx");

function parseQuestionExcel(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const rawData = XLSX.utils.sheet_to_json(sheet, {
    defval: "", // VERY IMPORTANT
  });

  return rawData.map((row, index) => ({
    questionId: index + 1,
    unit: row.UNIT,
    co: row.CO,
    unitTitle: row.UNIT_TITLE,
    type: row.TYPE,
    part: row.PART,
    question: row.QUESTION,
    marks: row.MARKS,
    bloomsTaxonomy: row.BT,
    level: row.LEVEL,
    status: "PENDING",
    approved: false,
    frozen: false,
  }));
}

module.exports = parseQuestionExcel;



