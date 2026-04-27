// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// export default function ExternalDashboard() {
//   const navigate = useNavigate();

//   const [bank, setBank] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchAssignedBank();
//   }, []);

//   const fetchAssignedBank = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/external-access/assigned-question-bank",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//           }
//         }
//       );
//       // console.log("Assigned bank response:", res.data);


//       setBank(res.data);
//     } catch (err) {
//       setError(
//         err.response?.data?.error ||
//         "Failed to load assigned question bank"
//       );
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("externalToken");
//     navigate("/");
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">
//           External Faculty Dashboard
//         </h1>

//         <button
//           onClick={logout}
//           className="bg-red-600 text-white px-4 py-1 rounded"
//         >
//           Logout
//         </button>
//       </div>

//       {error && (
//         <p className="text-red-600 mb-4">{error}</p>
//       )}

//       {!bank && !error && (
//         <p className="text-gray-600">
//           Loading assigned question bank...
//         </p>
//       )}

//       {bank && (
//         <div className="border p-4 rounded">
//           <p><b>Subject:</b> {bank.subject}</p>
//           <p><b>Examiner:</b> {bank.examinerName}</p>
//           <p><b>Examiner Email:</b> {bank.examinerEmail}</p>

//           <a
//             href={bank.questionBank.driveFileLink}
//             target="_blank"
//             rel="noreferrer"
//             className="text-blue-600 underline"
//           >
//             View Question Bank Excel
//           </a>
//         </div>
//       )}

//       <button
//         onClick={async () => {
//           try {
//             const res = await axios.get(
//               "http://localhost:5000/api/external-access/extract-questions",
//               {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//                 },
//               }
//             );

//             // Navigate to questions view
//             // navigate("/external/questions", {
//             //   state: {
//             //     subject: bank.subject,
//             //     examinerName: bank.examinerName,
//             //     questions: res.data.questions
//             //   }
//             // });

//             navigate("/external/questions", {
//               state:{ subject: bank.subject}
//             });


//           } catch (err) {
//             alert("Failed to extract questions");
//           }
//         }}
//         className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Extract Questions
//       </button>

//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function ExternalDashboard() {
  const navigate = useNavigate();

  const [bank, setBank] = useState(null);
  const [error, setError] = useState("");
  const [isExtracting, setIsExtracting] = useState(false); // ✅ NEW

  useEffect(() => {
    fetchAssignedBank();
  }, []);


  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const tokenFromUrl = params.get("token");

  //   if (tokenFromUrl) {
  //     // ✅ Store token
  //     sessionStorage.setItem("facultyToken", tokenFromUrl);

  //     // ✅ Set axios header
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${tokenFromUrl}`;

  //     // ✅ Clean URL (remove token from URL)
  //     window.history.replaceState({}, document.title, "/extract");
  //   } else {
  //     // 🔁 If already logged in (refresh case)
  //     const savedToken = sessionStorage.getItem("facultyToken");

  //     if (savedToken) {
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
  //     } else {
  //       // ❌ No token → redirect to login
  //       window.location.href = "/login";
  //       return;
  //     }
  //   }

  //   // ✅ AFTER token is set → call API
  //   fetchAssignedBank();

  // }, []);

  const fetchAssignedBank = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/external-access/assigned-question-bank",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
          }
        }
      );
      setBank(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Failed to load assigned question bank"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("externalToken");
    navigate("http://localhost:5173/dashboard/faculty-access-list");
  };

  const handleExtract = async () => {
    try {
      setIsExtracting(true);

      const res = await axios.get(
        "http://localhost:5000/api/external-access/extract-questions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
          },
        }
      );

      toast.success("Questions extracted successfully ✅");

      setTimeout(() => {
        navigate(`/external/questions/${bank.questionBank._id}`, {
          state: {
            subject: bank.subject,
          }
        });
      }, 1200);

    } catch (err) {
      toast.error("Failed to extract questions ❌");
    } finally {
      setIsExtracting(false);
    }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          External Faculty Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {!bank && !error && (
        <p className="text-gray-600">
          Loading assigned question bank...
        </p>
      )}

      {bank && (
        <div className="border p-4 rounded">
          <p><b>Subject:</b> {bank.subject}</p>
          <p><b>Course Name:</b> {bank.questionBank.courseName}</p>
          <p><b>Examiner:</b> {bank.examinerName}</p>
          <p><b>Examiner Email:</b> {bank.examinerEmail}</p>

          <a
            href={bank.questionBank.driveFileLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            View Question Bank Excel
          </a>
        </div>
      )}

      {/* <div className="space-x-10">
        <button className="mt-4 px-4 py-2 rounded text-black bg-blue-600" onClick={() => {
          navigate(`/external/questions/${bank.questionBank._id}`, {
            state: { subject: bank.subject }
          })
        }}>
          Next Step
        </button>

        <button
          onClick={handleExtract}
          disabled={isExtracting}
          className={`mt-4 px-4 py-2 rounded text-white 
    ${isExtracting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {isExtracting ? "Extracting..." : "Extract Questions"}
        </button>



      </div> */}




      <div className="flex justify-center mt-10">
        <div className="flex justify-around items-center w-[400px]">

          <button
            className="px-5 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              navigate(`/external/questions/${bank.questionBank._id}`, {
                state: { subject: bank.subject }
              });
            }}
          >
            Next Step
          </button>

          <button
            onClick={handleExtract}
            disabled={isExtracting}
            className={`px-5 py-2 rounded text-white 
        ${isExtracting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {isExtracting ? "Extracting..." : "Extract Questions"}
          </button>

        </div>
      </div>
    </div>
  );
}
