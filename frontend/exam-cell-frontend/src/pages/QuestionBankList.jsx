import { useState } from "react";
import axios from "../api/axios";

export default function QuestionBankList() {
  const [subject, setSubject] = useState("");
  const [questionBanks, setQuestionBanks] = useState([]);
  const [error, setError] = useState("");

  const fetchQuestionBanks = async () => {
    setError("");
    try {
      const res = await axios.get(
        `/question-banks/by-subject/${subject}`
      );
      setQuestionBanks(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Subject-wise Question Banks
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Subject Code (CS3751)"
          className="border p-2 flex-1"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button
          onClick={fetchQuestionBanks}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {error && (
        <p className="text-red-600 mb-3">{error}</p>
      )}

      {questionBanks.length === 0 && (
        <p className="text-gray-500">
          No question banks found
        </p>
      )}

      {questionBanks.length > 0 && (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Uploaded At</th>
              <th className="border p-2">Drive Link</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {questionBanks.map((qb) => (
              <tr key={qb._id}>
                <td className="border p-2">{qb.subject}</td>
                <td className="border p-2">
                  {new Date(qb.createdAt).toLocaleString()}
                </td>
                <td className="border p-2">
                  <a
                    href={qb.driveFileLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
                <td className="border p-2">
                  {qb.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
