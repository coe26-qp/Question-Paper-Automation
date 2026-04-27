// const { google } = require("googleapis");
// const path = require("path");

// const auth = new google.auth.GoogleAuth({
//   keyFile: path.join(__dirname, "../config/drive-service-account.json"), // YOUR service account
//   scopes: ["https://www.googleapis.com/auth/drive.readonly"]
// });

// async function downloadExcelFromDrive(fileId) {
//   const drive = google.drive({ version: "v3", auth });

//   const res = await drive.files.get(
//     { fileId, alt: "media" },
//     { responseType: "arraybuffer" }
//   );

//   return Buffer.from(res.data);
// }

// module.exports = { downloadExcelFromDrive };
