import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ViewQuestionBanks() {
  const [banks, setBanks] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [error, setError] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [assignForm, setAssignForm] = useState({
    examinerName: "",
    examinerEmail: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [subjectSearch, setSubjectSearch] = useState("");


  // 🔹 Load ALL question banks on page load
  useEffect(() => {
    fetchAllBanks();
  }, []);

  const fetchAllBanks = async () => {
    setError("");
    try {
      const res = await axios.get("/question-bank/all");
      setBanks(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to load question banks"
      );
    }
  };

  const fetchBySubject = async () => {
    if (!subjectFilter) {
      fetchAllBanks();
      return;
    }

    try {
      const res = await axios.get(
        `/question-bank/by-subject/${subjectFilter}`
      );
      setBanks(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to filter by subject"
      );
    }
  };

  // const assignQuestionBank = async () => {
  //   try {
  //     const res = await axios.post("question-bank/assign", {
  //       subject: selectedBank.subject,
  //       questionBankId: selectedBank._id,
  //       examinerName: assignForm.examinerName,
  //       examinerEmail: assignForm.examinerEmail
  //     });

  //     setCredentials(res.data);
  //     setSelectedBank(null);
  //     fetchAllBanks();
  //   } catch (err) {
  //     alert(err.response?.data?.error || "Assignment failed");
  //   }
  // };

  const assignQuestionBank = async () => {
    try {
      const res = await axios.post("question-bank/assign", {
        subject: selectedBank.subject,
        questionBankId: selectedBank._id,
        examinerName: assignForm.examinerName,
        examinerEmail: assignForm.examinerEmail
      });

      setCredentials(res.data);
      setShowPopup(true); // 👈 OPEN POPUP
      setSelectedBank(null);
      fetchAllBanks();

    } catch (err) {
      alert(err.response?.data?.error || "Assignment failed");
    }
  };

  const removeAssignment = async (bankId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this assignment?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/question-bank/remove-assignment/${bankId}`);
      fetchAllBanks();
    } catch (err) {
      alert(
        err.response?.data?.error || "Failed to remove assignment"
      );
    }
  };

  const deleteBank = async (bankId) => {
    const confirmDelete = window.confirm(
      "This will permanently delete the bank, extracted questions and assigned user (if any). Continue?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/question-bank/delete/${bankId}`);
      fetchAllBanks();
      alert("Deleted successfully");
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };



  // const handleStartGenerating = async (bankId) => {
  //   try {
  //     // 1️⃣ Get token from backend
  //     const res = await axios.get(`/external/auto-login/${bankId}`);

  //     const { token } = res.data;

  //     // 2️⃣ Redirect to faculty app with token
  //     window.location.href = `http://localhost:5174/dashboard?token=${token}`;

  //   } catch (err) {
  //     alert(err.response?.data?.message || "Failed to start");
  //   }
  // };


  const filteredBanks = banks.filter((bank) =>
    bank.subject.toLowerCase().includes(subjectSearch.toLowerCase())
  );


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Question Banks
      </h2>

      {/* 🔎 FILTER BAR */}
      <div className="flex gap-3 mb-5">
        {/* <input
          type="text"
          placeholder="Filter by Subject (optional)"
          className="border p-2 rounded w-64"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        /> */}

        <input
          type="text"
          placeholder="Search Subject (live filter)"
          className="border p-2 rounded w-64"
          value={subjectSearch}
          onChange={(e) => setSubjectSearch(e.target.value)}
        />

        <button
          onClick={fetchBySubject}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Apply Filter
        </button>

        <button
          onClick={fetchAllBanks}
          className="bg-gray-500 text-white px-4 rounded"
        >
          Clear
        </button>
      </div>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      {banks.length === 0 && !error && (
        <p className="text-gray-500">
          No question banks found
        </p>
      )}

      {banks.length > 0 && (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Subject Code</th>
              <th className="border p-2">Subject Name</th>
              <th className="border p-2">Uploaded At</th>
              <th className="border p-2">Assign</th>
              {/* <th className="border p-2">Status</th> */}
              <th className="border p-2">Action</th>
              <th className="border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {filteredBanks.map((bank) => (
              <tr key={bank._id}>
                <td className="border p-2">{bank.subject}</td>
                <td className="border p-2">{bank.courseName}</td>
                <td className="border p-2">
                  {new Date(bank.createdAt).toLocaleString()}
                </td>
                <td className="border p-2 place-items-center">
                  <div className="space-x-5">
                    {bank.status === "UPLOADED" ? (
                      <button
                        onClick={() => {
                          setSelectedBank(bank);
                          setCredentials(null);
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Assign
                      </button>
                    ) : (
                      <button
                        onClick={() => removeAssignment(bank._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    )}
                    {/* <button
                      onClick={() => alert("Starting Generation")}
                      className="bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Start Generating
                    </button> */}

                    {/* <button
                      onClick={() => handleStartGenerating(bank._id)}
                      className="bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Start Generating
                    </button> */}

                  </div>
                </td>

                <td className="relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === bank._id ? null : bank._id)
                    }
                    className="text-xl px-2 hover:text-red-600"
                  >
                    {openMenu === bank._id ? "✕" : "⋮"}
                  </button>

                  {openMenu === bank._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">

                      {/* <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => window.open(bank._id, "_blank")}
                      >
                        View Excel
                      </button> */}

                      <button
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        onClick={() => deleteBank(bank._id)}
                      >
                        Delete Question Bank
                      </button>

                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedBank && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">
              Assign – {selectedBank.subject}
            </h3>

            <input
              type="text"
              placeholder="Examiner Name"
              className="border p-2 w-full mb-2"
              onChange={(e) =>
                setAssignForm({
                  ...assignForm,
                  examinerName: e.target.value
                })
              }
            />

            <input
              type="email"
              placeholder="Examiner Email"
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                setAssignForm({
                  ...assignForm,
                  examinerEmail: e.target.value
                })
              }
            />

            <button
              onClick={assignQuestionBank}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              Assign & Generate Credentials
            </button>

            <button
              onClick={() => setSelectedBank(null)}
              className="mt-2 text-sm text-gray-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* {credentials && (
        <div className="bg-green-100 border p-4 mt-6 rounded">
          <h4 className="font-bold mb-2">Temporary External Login</h4>
          <p>User ID: <b>{credentials.tempUserId}</b></p>
          <p>Password: <b>{credentials.tempPassword}</b></p>
          <p>
            Expires:{" "}
            {new Date(credentials.expiresAt).toLocaleString()}
          </p>
        </div>
      )} */}

      {showPopup && credentials && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl p-6 w-[400px] relative animate-fadeIn">

            <h2 className="text-xl font-bold mb-4 text-green-700">
              Temporary External Login Created
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>User ID: <b>{credentials.tempUserId}</b></p>
              <p>Password: <b>{credentials.tempPassword}</b></p>
              <p>
                Expires:{" "}
                {new Date(credentials.expiresAt).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            </div>

          </div>
        </div>

      )}


    </div>
  );
}







