import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GeneratedPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:5000/api/question-bank/generated-paper-by-external",
        "https://question-paper-automation.onrender.com/api/question-bank/generated-paper-by-external",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("examCellToken")}`,
          },
        }
      );
      setPapers(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading generated papers...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Generated Question Papers</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Generated At</th>
            <th className="p-3 text-left">Pattern</th>
            <th className="p-3 text-left">Action</th>

          </tr>
        </thead>

        <tbody>
          {papers.map((paper) => (
            <tr key={paper._id} className="border-b">
              <td className="p-3">{paper.subject}</td>
              <td className="p-3 capitalize">{paper.status}</td>
              <td className="p-3">
                {new Date(paper.generatedAt).toLocaleString()}
              </td>
              <td className="p-3">{paper.pattern}</td>

              <td className="p-3">
                <button className="text-blue-600 hover:underline"
                  onClick={() => {
                    localStorage.setItem("examcellPaperId", paper._id);
                    navigate("/dashboard/generated-papers/preview", {
                      state: { paperId: paper._id, mode: "examcell" }
                    });
                  }}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
