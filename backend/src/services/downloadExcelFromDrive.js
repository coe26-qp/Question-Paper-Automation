// const { google } = require("googleapis");
// const path = require("path");

// // Auth using service account
// const auth = new google.auth.GoogleAuth({
//   keyFile: path.join(__dirname, "../config/drive-service-account.json"),
//   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
// });

// const drive = google.drive({ version: "v3", auth });

// async function downloadExcelFromDrive(fileId) {
//   const res = await drive.files.get(
//     {
//       fileId,
//       alt: "media",
//     },
//     { responseType: "arraybuffer" }
//   );

//   return Buffer.from(res.data);
// }

// module.exports = downloadExcelFromDrive;
