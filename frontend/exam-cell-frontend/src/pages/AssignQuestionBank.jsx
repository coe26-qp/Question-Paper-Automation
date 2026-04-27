// import { useEffect, useState } from "react";
// import axios from "../api/axios";

// export default function AssignQuestionBank() {
//   const [banks, setBanks] = useState([]);
//   const [externals, setExternals] = useState([]);
//   const [selectedBank, setSelectedBank] = useState("");
//   const [selectedExternal, setSelectedExternal] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   /* Fetch question banks */
//   useEffect(() => {
//     fetchBanks();
//     fetchExternalUsers();
//   }, []);

//   const fetchBanks = async () => {
//     try {
//       const res = await axios.get("/question-banks/all");
//       setBanks(res.data);
//     } catch (err) {
//       setError("Failed to load question banks");
//     }
//   };

//   const fetchExternalUsers = async () => {
//     try {
//       const res = await axios.get("/external/users");
//       setExternals(res.data);
//     } catch (err) {
//       setError("Failed to load external users");
//     }
//   };

//   const handleAssign = async () => {
//     setMessage("");
//     setError("");

//     if (!selectedBank || !selectedExternal) {
//       setError("Please select both question bank and faculty");
//       return;
//     }

//     try {
//       await axios.post("/question-banks/assign", {
//         questionBankId: selectedBank,
//         externalUserId: selectedExternal,
//       });

//       setMessage("Question bank assigned successfully ✅");
//       setSelectedBank("");
//       setSelectedExternal("");
//     } catch (err) {
//       setError(
//         err.response?.data?.error || "Assignment failed"
//       );
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-semibold mb-6 text-center">
//         Assign Question Bank
//       </h2>

//       {message && (
//         <p className="text-green-600 mb-3 text-center">
//           {message}
//         </p>
//       )}
//       {error && (
//         <p className="text-red-600 mb-3 text-center">
//           {error}
//         </p>
//       )}

//       {/* Question Bank Select */}
//       <div className="mb-4">
//         <label className="block mb-1 font-medium">
//           Question Bank
//         </label>
//         <select
//           className="w-full border px-3 py-2 rounded"
//           value={selectedBank}
//           onChange={(e) => setSelectedBank(e.target.value)}
//         >
//           <option value="">Select Question Bank</option>
//           {banks.map((bank) => (
//             <option key={bank._id} value={bank._id}>
//               {bank.subject}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* External Faculty Select */}
//       <div className="mb-6">
//         <label className="block mb-1 font-medium">
//           External Faculty
//         </label>
//         <select
//           className="w-full border px-3 py-2 rounded"
//           value={selectedExternal}
//           onChange={(e) => setSelectedExternal(e.target.value)}
//         >
//           <option value="">Select Faculty</option>
//           {externals.map((user) => (
//             <option key={user._id} value={user._id}>
//               {user.username} ({user.email})
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={handleAssign}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//       >
//         Assign
//       </button>
//     </div>
//   );
// }
