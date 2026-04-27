// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import QuestionCard from "../components/QuestionCard";
// import EditQuestionModal from "../components/EditQuestionModal";

// export default function ExternalQuestionBank() {
//   const navigate = useNavigate();

//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editingQuestion, setEditingQuestion] = useState(null);
//   const [generationType, setGenerationType] = useState("R24SEM");
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     year: "",
//     degree: "",
//     branch: "",
//     semester: "",
//     courseName: "",
//     date: ""
//   });
//   const [semester, setSemester] = useState("");
//   const [approvedCounts, setApprovedCounts] = useState([]);
//   const { questionBankId } = useParams();




//   const REQUIREMENTS = {
//     "CO4-P1": { O: 1, D: 2 },
//     "CO4-P2": { O: 1, D: 2 },

//     "CO5-P1": { O: 1, D: 2 },
//     "CO5-P2": { O: 1, D: 2 },

//     "CO3-P2": { O: 1, D: 2 },


//     // others if needed
//   };



//   useEffect(() => {
//     fetchQuestions();
//     if (questionBankId) {
//       fetchApprovedCounts();
//     }
//   }, [questionBankId]);

//   const fetchQuestions = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/external-access/fetch-extracted-questions",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//           },
//         }
//       );

//       setQuestions(res.data.questions);
//     } catch (err) {
//       setError("Failed to load questions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (q) => {
//     setEditingQuestion(q);
//   };

//   const handleSaveEdit = async (updated) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/external/questions/${updated._id}`,
//         updated,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//           },
//         }
//       );

//       setEditingQuestion(null);
//       fetchQuestions();
//     } catch (err) {
//       alert("Failed to update question");
//     }
//   };

//   const handleApprove = async (_id) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/external/questions/${_id}/approve`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//           },
//         }
//       );

//       setQuestions(prev =>
//         prev.map(q =>
//           q._id === _id ? { ...q, approved: true } : q
//         )
//       );
//       fetchApprovedCounts(); // 🔥 after approval
//     } catch (err) {
//       alert(err.response?.data?.error || "Approve failed");
//     }
//   };

//   const handleApproveAll = async () => {
//     const pending = questions.filter(
//       q => !q.approved && !q.frozen
//     );

//     if (pending.length === 0) {
//       alert("No pending questions to approve");
//       return;
//     }

//     for (const q of pending) {
//       await handleApprove(q._id);
//     }
//     fetchApprovedCounts(); // 🔥 after approval
//   };

//   const handleFreeze = async (_id) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/external/questions/${_id}/freeze`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//           },
//         }
//       );

//       setQuestions(prev =>
//         prev.map(q =>
//           q._id === _id ? { ...q, frozen: true } : q
//         )
//       );
//     } catch (err) {
//       alert(err.response?.data?.error || "Freeze failed");
//     }
//   };

//   const handleGeneratePaper = async (pattern) => {
//     try {

//       if (!formData.year || !formData.degree || !formData.branch) {
//         alert("Please fill all fields");
//         return;
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/paper-generation/generate",
//         {
//           pattern,
//           year: formData.year,
//           degree: formData.degree,
//           branch: formData.branch,
//           semester: formData.semester,
//           courseName: formData.courseName,
//           date: formData.date
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       localStorage.setItem("paperId", res.data.paperId);

//       setShowModal(false); // close modal

//       navigate("/external/paper-preview", {
//         state: { paperId: res.data.paperId },
//       });

//     } catch (err) {
//       alert("Failed to generate question paper");
//     }
//   };

//   const canApproveAny = questions.some(
//     q => !q.approved && !q.frozen
//   );


//   const fetchApprovedCounts = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/external/questions/approved-count",
//         {
//           params: { questionBankId },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//           },
//         }
//       );

//       setApprovedCounts(res.data.data);
//     } catch (err) {
//       console.error("Failed to fetch approved counts", err);
//     }
//   };


//   const buildInitialData = () => {
//     const base = {};

//     Object.entries(REQUIREMENTS).forEach(([key, value]) => {
//       base[key] = {
//         O: { approved: 0, required: value.O },
//         D: { approved: 0, required: value.D }
//       };
//     });

//     return base;
//   };


//   const progressData = (data) => {
//     const grouped = buildInitialData();

//     data.forEach(item => {
//       const key = `CO${item.co}-P${item.part}`;

//       if (grouped[key]) {
//         grouped[key][item.type].approved = item.count;
//       }
//     });

//     return grouped;
//   };


//   const getPercentage = (approved, required) => {
//     if (!required) return 0;
//     return Math.min((approved / required) * 100, 100);
//   };

//   const groupedData = progressData(approvedCounts);

//   const canGenerate = Object.values(groupedData).every(item =>
//     item.O.approved >= item.O.required &&
//     item.D.approved >= item.D.required
//   );


//   return (
//     <div className="h-screen flex flex-col">

//       {/* ===== Sticky Top Bar ===== */}
//       <div className="sticky top-0 z-20 bg-white border-b shadow-sm p-4">
//         <div className="flex flex-wrap items-center justify-between gap-4">

//           <h1 className="text-xl font-bold">
//             External Question Bank
//           </h1>
//           <h1 className="text-xl font-bold">

//           </h1>

//           <div className="flex flex-wrap items-center gap-3">

//             <button
//               onClick={handleApproveAll}
//               disabled={!canApproveAny}
//               className={`px-4 py-2 rounded text-white
//                 ${canApproveAny
//                   ? "bg-green-600 hover:bg-green-700"
//                   : "bg-gray-400 cursor-not-allowed"}
//               `}
//             >
//               Approve All
//             </button>

//             <select
//               value={generationType}
//               onChange={(e) => setGenerationType(e.target.value)}
//               className="border rounded px-3 py-2"
//             >
//               <option value="R20IA1">R20 - IA 1</option>
//               <option value="R20IA2">R20 - IA 2</option>
//               <option value="R20SEM">R20 - SEMESTER</option>
//               <option value="R24IA1">R24 - IA 1</option>
//               <option value="R24IA2">R24 - IA 2</option>
//               <option value="R24SEM">R24 - SEMESTER</option>
//             </select>

//             {/* <button
//               onClick={() => handleGeneratePaper(generationType)}
//               className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800"
//             >
//               Generate Paper
//             </button> */}
//             <button onClick={() => {
//               setShowModal(true);
//               setGenerationType(generationType); // Store pattern temporarily
//             }}
//               className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800">
//               Generate Paper
//             </button>

//             <button
//               onClick={() => navigate(-1)}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Back
//             </button>

//           </div>
//         </div>



//         <div className="mt-4 p-3 bg-white rounded shadow">

//           <h2 className="font-semibold mb-3 text-sm">
//             Question Progress
//           </h2>

//           <div className="grid grid-cols-10 gap-2">

//             {Object.entries(groupedData).map(([key, value], i) => (
//               <div key={i} className="border rounded p-2 text-xs shadow-sm">

//                 {/* Title */}
//                 <div className="font-medium mb-1 text-center">
//                   {key}
//                 </div>

//                 {/* O Type */}
//                 <div className="mb-1">
//                   <div className="flex justify-between text-[10px]">
//                     <span>O</span>
//                     <span>
//                       {value.O.approved} / {value.O.required}
//                     </span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-1.5 rounded">
//                     <div
//                       className={`h-1.5 rounded ${value.O.approved >= value.O.required
//                         ? "bg-green-500"
//                         : "bg-red-500"
//                         }`}
//                       style={{
//                         width: `${getPercentage(
//                           value?.O?.approved || 0,
//                           value?.O?.required || 1
//                         )}%`
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {/* D Type */}
//                 <div>
//                   <div className="flex justify-between text-[10px]">
//                     <span>D</span>
//                     <span>
//                       {value.D.approved} / {value.D.required}
//                     </span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-1.5 rounded">
//                     <div
//                       className={`h-1.5 rounded ${value.D.approved >= value.D.required
//                         ? "bg-green-500"
//                         : "bg-red-500"
//                         }`}
//                       style={{
//                         width: `${getPercentage(
//                           value.D.approved,
//                           value.D.required
//                         )}%`
//                       }}
//                     />
//                   </div>
//                 </div>

//               </div>
//             ))}

//           </div>
//         </div>

//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded shadow-lg w-96">

//               <h3 className="text-lg font-bold mb-4">Enter Exam Details</h3>

//               <input
//                 type="text"
//                 placeholder="Course Name"
//                 className="w-full border p-2 mb-3 rounded"
//                 value={formData.courseName}
//                 onChange={(e) =>
//                   setFormData({ ...formData, courseName: e.target.value })
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Year (e.g., 2026)"
//                 className="w-full border p-2 mb-3 rounded"
//                 value={formData.year}
//                 onChange={(e) =>
//                   setFormData({ ...formData, year: e.target.value })
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Degree (e.g., B.E)"
//                 className="w-full border p-2 mb-3 rounded"
//                 value={formData.degree}
//                 onChange={(e) =>
//                   setFormData({ ...formData, degree: e.target.value })
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Branch (e.g., CSE)"
//                 className="w-full border p-2 mb-4 rounded"
//                 value={formData.branch}
//                 onChange={(e) =>
//                   setFormData({ ...formData, branch: e.target.value })
//                 }
//               />
//               <select
//                 value={formData.semester}
//                 onChange={(e) =>
//                   setFormData({ ...formData, semester: e.target.value })
//                 }
//                 required
//                 className="border rounded px-3 py-2"
//               >
//                 <option value="">Select Semester</option>
//                 <option value="Second">I-Year Second Sem</option>
//                 <option value="Fourth">II-Year Second Sem</option>
//               </select>

//               <input
//                 type="date"
//                 placeholder="Date of the Exam"
//                 className="w-full border p-2 mb-4 rounded"
//                 value={formData.date}
//                 onChange={(e) =>
//                   setFormData({ ...formData, date: e.target.value })
//                 }
//               />

//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={() => handleGeneratePaper(generationType)}
//                   className="bg-purple-700 text-white px-4 py-2 rounded"
//                 >
//                   Submit
//                 </button>
//               </div>

//             </div>
//           </div>
//         )}
//       </div>

//       {/* ===== Scrollable Content ===== */}
//       <div className="flex-1 overflow-y-auto p-6">

//         {loading && <p className="text-gray-600">Loading questions...</p>}
//         {error && <p className="text-red-600">{error}</p>}

//         {!loading && questions.length === 0 && (
//           <p className="text-gray-600">No questions found</p>
//         )}

//         <div className="space-y-4">
//           {questions.map((q, index) => (
//             <QuestionCard
//               key={q._id}
//               q={q}
//               index={index}
//               onEdit={handleEdit}
//               onApprove={handleApprove}
//               onFreeze={handleFreeze}
//             />
//           ))}
//         </div>
//       </div>

//       {editingQuestion && (
//         <EditQuestionModal
//           question={editingQuestion}
//           onSave={handleSaveEdit}
//           onClose={() => setEditingQuestion(null)}
//         />
//       )}
//       {!canGenerate && (
//         <p className="text-red-500 text-xs mt-2">
//           Minimum requirements not met
//         </p>
//       )}
//     </div>
//   );
// }





import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import EditQuestionModal from "../components/EditQuestionModal";

export default function ExternalQuestionBank() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [generationType, setGenerationType] = useState("R24SEM");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    year: "",
    degree: "",
    branch: "",
    semester: "",
    courseName: "",
    date: ""
  });
  const [semester, setSemester] = useState("");
  const [approvedCounts, setApprovedCounts] = useState([]);
  const { questionBankId } = useParams();
  const [filters, setFilters] = useState({
    co: "ALL",
    part: "ALL",
    type: "ALL"
  });
  // const coOptions = [...new Set(questions.map(q => q.co))];
  // const partOptions = [...new Set(questions.map(q => q.part))];

  const coOptions = [1, 2, 3, 4, 5];
  const partOptions = [1, 2];

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      return (
        (filters.co === "ALL" || q.co === Number(filters.co)) &&
        (filters.part === "ALL" || q.part === Number(filters.part)) &&
        (filters.type === "ALL" || q.type === filters.type)
      );
    });
  }, [questions, filters]);


  const REQUIREMENT_MAP = {
    R24IA1: {
      "CO1-P1": { O: 1, D: 2 },
      "CO1-P2": { O: 1, D: 2 },
      "CO2-P1": { O: 1, D: 2 },
      "CO2-P2": { O: 1, D: 2 },
      "CO3-P1": { O: 1, D: 2 },
    },

    R24IA2: {
      "CO4-P1": { O: 1, D: 2 },
      "CO4-P2": { O: 1, D: 2 },
      "CO5-P1": { O: 1, D: 2 },
      "CO5-P2": { O: 1, D: 2 },
      "CO3-P2": { O: 1, D: 2 },
    },

    R20IA1: {
      "CO1-P1": { O: 2, D: 1 },
      "CO1-P2": { O: 1, D: 1 },
    },

    R24SEM: {
      "CO1-P1": { O: 4, D: 4 },
      "CO1-P2": { O: 4, D: 4 },
      "CO2-P1": { O: 4, D: 4 },
      "CO2-P2": { O: 4, D: 4 },
      "CO3-P1": { O: 4, D: 4 },
      "CO3-P2": { O: 4, D: 4 },
      "CO4-P1": { O: 4, D: 4 },
      "CO4-P2": { O: 4, D: 4 },
      "CO5-P1": { O: 4, D: 4 },
      "CO5-P2": { O: 4, D: 4 }
    },

    DEFAULT: {}
  };



  useEffect(() => {
    fetchQuestions();

    if (questionBankId) {
      fetchApprovedCounts();
    }
  }, [questionBankId, generationType]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/external-access/fetch-extracted-questions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
          },
        }
      );

      setQuestions(res.data.questions);
    } catch (err) {
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (q) => {
    setEditingQuestion(q);
  };

  const handleSaveEdit = async (updated) => {
    try {
      await axios.put(
        `http://localhost:5000/api/external/questions/${updated._id}`,
        updated,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
          },
        }
      );

      setEditingQuestion(null);
      fetchQuestions();
    } catch (err) {
      alert("Failed to update question");
    }
  };

  const handleApprove = async (_id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/external/questions/${_id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
          },
        }
      );

      setQuestions(prev =>
        prev.map(q =>
          q._id === _id ? { ...q, approved: true } : q
        )
      );
      fetchApprovedCounts(); // 🔥 after approval
    } catch (err) {
      alert(err.response?.data?.error || "Approve failed");
    }
  };

  const handleApproveAll = async () => {
    const pending = questions.filter(
      q => !q.approved && !q.frozen
    );

    if (pending.length === 0) {
      alert("No pending questions to approve");
      return;
    }

    for (const q of pending) {
      await handleApprove(q._id);
    }
    fetchApprovedCounts(); // 🔥 after approval
  };

  const handleFreeze = async (_id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/external/questions/${_id}/freeze`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
          },
        }
      );

      setQuestions(prev =>
        prev.map(q =>
          q._id === _id ? { ...q, frozen: true } : q
        )
      );
    } catch (err) {
      alert(err.response?.data?.error || "Freeze failed");
    }
  };


  const handleDeApprove = async (_id) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/external/questions/${_id}/deapprove`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
        },
      }
    );

    const updatedQuestion = res.data.question;

    setQuestions(prev =>
      prev.map(q =>
        q._id === _id ? updatedQuestion : q
      )
    );

    fetchApprovedCounts();
  } catch (err) {
    alert(err.response?.data?.error || "De-Approve failed");
  }
};

  const handleGeneratePaper = async (pattern) => {
    try {

      if (!formData.year || !formData.degree || !formData.branch) {
        alert("Please fill all fields");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/paper-generation/generate",
        {
          pattern,
          year: formData.year,
          degree: formData.degree,
          branch: formData.branch,
          semester: formData.semester,
          courseName: formData.courseName,
          date: formData.date
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("paperId", res.data.paperId);

      setShowModal(false); // close modal

      navigate("/external/paper-preview", {
        state: { paperId: res.data.paperId },
      });

    } catch (err) {
      alert("Failed to generate question paper");
    }
  };

  const canApproveAny = questions.some(
    q => !q.approved && !q.frozen
  );


  const fetchApprovedCounts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/external/questions/approved-count",
        {
          params: { questionBankId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
          },
        }
      );

      setApprovedCounts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch approved counts", err);
    }
  };

  const activeRequirements =
    REQUIREMENT_MAP[generationType] || REQUIREMENT_MAP.DEFAULT;

  const buildInitialData = () => {
    const base = {};

    Object.entries(activeRequirements).forEach(([key, value]) => {
      base[key] = {
        O: { approved: 0, required: value.O },
        D: { approved: 0, required: value.D }
      };
    });

    return base;
  };


  const progressData = (data) => {
    const grouped = buildInitialData();

    data.forEach(item => {
      const key = `CO${item.co}-P${item.part}`;

      if (grouped[key]) {
        grouped[key][item.type].approved = item.count;
      }
    });

    return grouped;
  };


  const getPercentage = (approved, required) => {
    if (!required) return 0;
    return Math.min((approved / required) * 100, 100);
  };

  // const groupedData = progressData(approvedCounts);
  const groupedData = useMemo(() => {
    return progressData(approvedCounts);
  }, [approvedCounts, generationType]);

  const canGenerate = Object.values(groupedData).every(item =>
    item.O.approved >= item.O.required &&
    item.D.approved >= item.D.required
  );

  return (
    <div className="h-screen flex flex-col">

      {/* ===== TOP BAR (UNCHANGED) ===== */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">

          <h1 className="text-xl font-bold">
            External Question Bank
          </h1>

          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={handleApproveAll}
              disabled={!canApproveAny}
              className={`px-4 py-2 rounded text-white
              ${canApproveAny
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"}
            `}
            >
              Approve All
            </button>

            {/* ✅ FULL DROPDOWN KEPT */}
            <select
              value={generationType}
              onChange={(e) => setGenerationType(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {/* <option value="R20IA1">R20 - IA 1</option>
              <option value="R20IA2">R20 - IA 2</option>
              <option value="R20SEM">R20 - SEMESTER</option> */}
              <option value="R24IA1">R24 - IA 1</option>
              <option value="R24IA2">R24 - IA 2</option>
              <option value="R24SEM">R24 - SEMESTER</option>
            </select>

            <button
              onClick={() => {
                setShowModal(true);
                setGenerationType(generationType);
              }}
              className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800"
            >
              Generate Paper
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>

          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT (UPDATED LAYOUT) ===== */}
      <div className="flex flex-1 overflow-hidden">

        {/* ===== LEFT: PROGRESS ===== */}
        <div className="w-[300px] border-r bg-gray-100/70 p-4 overflow-y-auto">

          <h2 className="font-semibold mb-3 text-sm">
            Question Progress
          </h2>

          <div className="space-y-3">
            {Object.entries(groupedData).map(([key, value], i) => (
              <div key={i} className="bg-white border rounded p-2 text-xs shadow-sm">

                <div className="font-medium mb-1 text-center">
                  {key}
                </div>

                {/* O */}
                <div className="mb-1">
                  <div className="flex justify-between text-[10px]">
                    <span>O</span>
                    <span>{value.O.approved} / {value.O.required}</span>
                  </div>
                  <div className="bg-gray-200 h-1.5 rounded">
                    <div
                      className={`h-1.5 rounded ${value.O.approved >= value.O.required
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                      style={{
                        width: `${getPercentage(value.O.approved, value.O.required)}%`
                      }}
                    />
                  </div>
                </div>

                {/* D */}
                <div>
                  <div className="flex justify-between text-[10px]">
                    <span>D</span>
                    <span>{value.D.approved} / {value.D.required}</span>
                  </div>
                  <div className="bg-gray-200 h-1.5 rounded">
                    <div
                      className={`h-1.5 rounded ${value.D.approved >= value.D.required
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                      style={{
                        width: `${getPercentage(value.D.approved, value.D.required)}%`
                      }}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

          {!canGenerate && (
            <p className="text-red-500 text-xs mt-3">
              Minimum requirements not met
            </p>
          )}
        </div>

        {/* ===== RIGHT: QUESTIONS ===== */}
        <div className="flex-1 overflow-y-auto p-1">


          {/* ===== FILTER DROPDOWNS ===== */}
          <div className="sticky flex flex-wrap items-center gap-8 top-0 z-10 bg-gray-100 border rounded-lg px-4 py-3 shadow-sm mb-4">
            <div className="flex flex-wrap items-center gap-4"></div>

            <span className="text-sm font-semibold text-gray-700">
              Filter Questions:
            </span>

            {/* CO */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1 font-bold">CO</label>
              <select
                value={filters.co}
                onChange={(e) => setFilters({ ...filters, co: e.target.value })}
                className="border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400"
              >
                <option value="ALL">All</option>
                {coOptions.map(co => (
                  <option key={co} value={co}>CO{co}</option>
                ))}
              </select>
            </div>

            {/* PART */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1 font-bold">Part</label>
              <select
                value={filters.part}
                onChange={(e) => setFilters({ ...filters, part: e.target.value })}
                className="border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400"
              >
                <option value="ALL">All</option>
                {partOptions.map(p => (
                  <option key={p} value={p}>P{p}</option>
                ))}
              </select>
            </div>

            {/* TYPE */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1 font-bold">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400"
              >
                <option value="ALL">All</option>
                <option value="O">Objective</option>
                <option value="D">Descriptive</option>
              </select>
            </div>

            {/* RESET */}
            <button
              onClick={() => setFilters({ co: "ALL", part: "ALL", type: "ALL" })}
              className="ml-auto bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md text-sm"
            >
              Reset
            </button>

          </div>

          {loading && <p className="text-gray-600">Loading questions...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && questions.length === 0 && (
            <p className="text-gray-600">No questions found</p>
          )}

          <div className="space-y-4">
            {filteredQuestions.map((q, index) => (
              <QuestionCard
                key={q._id}
                q={q}
                index={index}
                onEdit={handleEdit}
                onApprove={handleApprove}
                onFreeze={handleFreeze}
                onDeApprove={handleDeApprove}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ===== MODAL (UNCHANGED) ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">

            <h3 className="text-lg font-bold mb-4">Enter Exam Details</h3>

            <input
              type="text"
              placeholder="Course Name"
              className="w-full border p-2 mb-3 rounded"
              value={formData.courseName}
              onChange={(e) =>
                setFormData({ ...formData, courseName: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Year"
              className="w-full border p-2 mb-3 rounded"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Degree"
              className="w-full border p-2 mb-3 rounded"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Branch"
              className="w-full border p-2 mb-3 rounded"
              value={formData.branch}
              onChange={(e) =>
                setFormData({ ...formData, branch: e.target.value })
              }
            />

            <select
              value={formData.semester}
              onChange={(e) =>
                setFormData({ ...formData, semester: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            >
              <option value="">Select Semester</option>
              <option value="Second">I-Year Second Sem</option>
              <option value="Fourth">II-Year Second Sem</option>
            </select>

            <input
              type="date"
              className="w-full border p-2 mb-4 rounded"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => handleGeneratePaper(generationType)}
                className="bg-purple-700 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingQuestion && (
        <EditQuestionModal
          question={editingQuestion}
          onSave={handleSaveEdit}
          onClose={() => setEditingQuestion(null)}
        />
      )}

    </div>
  );
}