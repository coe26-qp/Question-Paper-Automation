const axios = require("axios");
const FormData = require("form-data");

exports.extractQuestions = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(
      process.env.FLASK_API_URL + "/extract",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Flask API Error:", error.message);
    res.status(500).json({ error: "Extraction failed" });
  }
};