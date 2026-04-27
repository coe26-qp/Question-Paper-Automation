// import { useState } from "react";
// import axios from "../api/axios";

// export default function UploadQuestionBank() {
//   const [subject, setSubject] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [session, setSession] = useState("");
//   const [year, setYear] = useState("");
//   const [degreeBranch, setDegreeBranch] = useState("");
//   const [courseName, setCourseName] = useState("");
//   const [time, setTime] = useState("");
//   const [maxMarks, setMaxMarks] = useState("");

//   const [popup, setPopup] = useState({
//     show: false,
//     type: "", // success | error
//     message: "",
//   });

//   const showPopup = (type, message) => {
//     setPopup({ show: true, type, message });

//     setTimeout(() => {
//       setPopup({ show: false, type: "", message: "" });
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       showPopup("error", "Please select an Excel file");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("subject", subject);
//       formData.append("file", file);
//       formData.append("session", session);
//       formData.append("year", year);
//       formData.append("degreeBranch", degreeBranch);
//       formData.append("courseName", courseName);
//       formData.append("time", time);
//       formData.append("maxMarks", maxMarks);

//       await axios.post("/question-bank/upload", formData);

//       showPopup("success", "Question bank uploaded successfully ✅");

//       setSubject("");
//       setFile(null);
//       e.target.reset(); // clear file input
//     } catch (err) {
//       showPopup(
//         "error",
//         err.response?.data?.error || "Upload failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-4">
//         Upload Question Bank
//       </h2>

//       {/* Popup Notification */}
//       {popup.show && (
//         <div
//           className={`fixed top-5 right-5 px-5 py-3 rounded shadow-lg text-white font-semibold transition-all
//           ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}
//         >
//           {popup.message}
//         </div>
//       )}

//       {/* <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Subject Code (e.g., CS3751)"
//           className="border p-2 w-full mb-3"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           required
//           disabled={loading}
//         />

//         <input
//           type="file"
//           accept=".xlsx"
//           className="border p-2 w-full mb-4"
//           onChange={(e) => setFile(e.target.files[0])}
//           disabled={loading}
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-4 py-2 rounded text-white transition
//           ${loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"}`}
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </form> */}

//       <form onSubmit={handleSubmit}>

//         {/* Subject Code */}
//         <input
//           type="text"
//           placeholder="Subject Code (e.g., CS3751)"
//           className="border p-2 w-full mb-3"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           required
//           disabled={loading}
//         />

//         {/* Session Dropdown */}
//         <select
//           className="border p-2 w-full mb-3"
//           value={session}
//           onChange={(e) => setSession(e.target.value)}
//           required
//           disabled={loading}
//         >
//           <option value="">Select Exam Session</option>
//           <option value="May/June">May/June</option>
//           <option value="Nov/Dec">November/December</option>
//         </select>

//         {/* Year */}
//         <input
//           type="text"
//           placeholder="Year (e.g., 2026)"
//           className="border p-2 w-full mb-3"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           required
//           disabled={loading}
//         />

//         {/* Degree & Branch */}
//         <input
//           type="text"
//           placeholder="Degree & Branch (e.g., B.E CSE)"
//           className="border p-2 w-full mb-3"
//           value={degreeBranch}
//           onChange={(e) => setDegreeBranch(e.target.value)}
//           required
//           disabled={loading}
//         />

//         {/* Course Name */}
//         <input
//           type="text"
//           placeholder="Course Name"
//           className="border p-2 w-full mb-3"
//           value={courseName}
//           onChange={(e) => setCourseName(e.target.value)}
//           required
//           disabled={loading}
//         />

//         {/* Time (Optional) */}
//         <input
//           type="text"
//           placeholder="Time (e.g., 3 Hours)"
//           className="border p-2 w-full mb-3"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           disabled={loading}
//         />

//         {/* Maximum Marks */}
//         <input
//           type="text"
//           placeholder="Maximum Marks"
//           className="border p-2 w-full mb-3"
//           value={maxMarks}
//           onChange={(e) => setMaxMarks(e.target.value)}
//           required
//           disabled={loading}
//         />

//         {/* Excel Upload */}
//         <input
//           type="file"
//           accept=".xlsx"
//           className="border p-2 w-full mb-4"
//           onChange={(e) => setFile(e.target.files[0])}
//           disabled={loading}
//           required
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`px-4 py-2 rounded text-white transition
//       ${loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"}`}
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>

//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "../api/axios";

export default function UploadQuestionBank() {
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [session, setSession] = useState("");
  // const [year, setYear] = useState("");
  // const [degreeBranch, setDegreeBranch] = useState("");
  const [courseName, setCourseName] = useState("");
  // const [time, setTime] = useState("");
  // const [maxMarks, setMaxMarks] = useState("");
  // const [examDate, setExamDate] = useState("");

  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return showPopup("error", "Please select an Excel file");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("file", file);
      // formData.append("session", session);
      // formData.append("year", year);
      // formData.append("degreeBranch", degreeBranch);
      formData.append("courseName", courseName);
      // formData.append("time", time);
      // formData.append("maxMarks", maxMarks);
      // formData.append("examDate", examDate);

      await axios.post("/question-bank/upload", formData);

      showPopup("success", "Question bank uploaded successfully ✅");

      setSubject("");
      setFile(null);
      // setSession("");
      // setYear("");
      // setDegreeBranch("");
      setCourseName("");
      // setTime("");
      // setMaxMarks("");
      e.target.reset();
    } catch (err) {
      showPopup("error", err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-xl text-white font-semibold animate-fadeIn
          ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {popup.message}
        </div>
      )}

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Upload Question Bank
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* BASIC DETAILS */}
          <div>
            {/* <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">
              Basic Details
            </h3> */}

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="label">Subject Code *</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  disabled={loading}
                  className="input"
                />
              </div>

              {/* <div>
                <label className="label">Exam Session *</label>
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  required
                  disabled={loading}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="May/June">May / June</option>
                  <option value="Nov/Dec">November / December</option>
                </select>
              </div> */}

              {/* <div>
                <label className="label">Year *</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  disabled={loading}
                  className="input"
                />
              </div> */}

              {/* <div>
                <label className="label">Maximum Marks *</label>
                <input
                  type="text"
                  value={maxMarks}
                  onChange={(e) => setMaxMarks(e.target.value)}
                  required
                  disabled={loading}
                  className="input"
                />
              </div> */}

            </div>
          </div>

          {/* COURSE DETAILS */}
          <div>
            {/* <h3 className="font-bold text-gray-700 mb-3 border-b pb-1 text-center">
              Course Details
            </h3> */}

            <div className="grid md:grid-cols-2 gap-4">

              {/* <div>
                <label className="label">Degree & Branch *</label>
                <input
                  type="text"
                  value={degreeBranch}
                  onChange={(e) => setDegreeBranch(e.target.value)}
                  required
                  disabled={loading}
                  className="input"
                />
              </div> */}

              <div>
                <label className="label">Course Name *</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                  disabled={loading}
                  className="input"
                />
              </div>

              {/* <div>
                <label className="label">Exam Duration</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  disabled={loading}
                  className="input"
                  placeholder="3 Hours"
                />
              </div> */}
              {/* <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                required
                disabled={loading}
                className="input"
              /> */}

            </div>
          </div>

          {/* FILE UPLOAD */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">
              Upload Excel File
            </h3>

            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
              <input
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                required
                disabled={loading}
              />

              <span className="text-gray-500 text-sm">
                {file ? file.name : "Click to upload .xlsx file"}
              </span>
            </label>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition
            ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"}`}
          >
            {loading ? "Uploading Question Bank..." : "Upload Question Bank"}
          </button>

        </form>
      </div>
    </div>
  );
}