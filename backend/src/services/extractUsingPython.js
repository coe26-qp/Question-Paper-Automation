// const axios = require("axios");
// const FormData = require("form-data");

// async function extractUsingPython(buffer) {
//   try {
//     const formData = new FormData();
//     formData.append("file", buffer, {
//       filename: "questions.xlsx",
//       contentType:
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     const response = await axios.post(
//       "http://127.0.0.1:5001/extract",
//       formData,
//       {
//         headers: formData.getHeaders(),
//         maxBodyLength: Infinity,
//         maxContentLength: Infinity,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Python Service Error:", error.message);
//     throw new Error("Failed to extract from Python service");
//   }
// }

// module.exports = extractUsingPython;




const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function extractUsingPython(filePath) {
  try {
    const formData = new FormData();

    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
      "http://127.0.0.1:5001/extract",
      // "https://question-paper-automation-flask-api.onrender.com/extract",
      formData,
      {
        headers: formData.getHeaders(),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Python Service Error:", error.message);
    throw new Error("Failed to extract from Python service");
  }
}

module.exports = extractUsingPython;