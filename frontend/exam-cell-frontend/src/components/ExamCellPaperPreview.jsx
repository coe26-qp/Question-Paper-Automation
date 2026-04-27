import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IA1PartAGeneratedSection from "../../../external-frontend/src/components/R24/IA1PartAGeneratedSection";
import IA1PartBGeneratedSection from "../../../external-frontend/src/components/R24/IA1PartBGeneratedSection";
import PartASection from "../../../external-frontend/src/components/R24/SemPartAGeneratedSection";
import PartBSection from "../../../external-frontend/src/components/R24/SemPartBGeneratedSection";
import html2pdf from "html2pdf.js";

export default function ExamCellPaperPreview() {
  const { state } = useLocation();
  const paperId = state?.paperId || localStorage.getItem("paperId");

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // console.log(paper)

  useEffect(() => {
    fetchPaper();
  }, []);

  const fetchPaper = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/paper-generation/examcell/fetchQuestionPaper/${paperId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("examCellToken")}`,
          },
        }
      );

      setPaper(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const downloadPDF = async () => {
    const element = document.getElementById("question-paper");

    if (!element) {
      alert("Question paper content not found");
      return;
    }

    // Remove preview zoom before export
    // element.classList.remove("preview-zoom");

    // Wait for layout & images
    await new Promise((r) => setTimeout(r, 500));
    await new Promise((r) => requestAnimationFrame(r));

    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalHeight !== 0) resolve();
            else img.onload = img.onerror = resolve;
          })
      )
    );

    const options = {
      margin: [10, 10, 10, 10],
      filename: `${paper.subject}-${paper.examDetails.courseName}-${paper.pattern}.pdf`,
      image: { type: "jpeg", quality: 1 },
      // html2canvas: {
      //   scale: 2,
      //   useCORS: true,
      //   scrollY: 0,
      //   windowWidth: element.scrollWidth
      // },
      html2canvas: {
        scale: 2,
        useCORS: true,
        // scrollY: -window.scrollY,
        scrollY: 0,
        windowWidth: document.body.scrollWidth
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: ["css", "legacy"], // ✅ only css (NO legacy)
      },
    };

    await html2pdf().set(options).from(element).save();

    // Add zoom back
    element.classList.add("preview-zoom");
  };

  if (loading) return <p>Loading paper...</p>;
  if (!paper) return <p>Paper not found</p>;

  return (
    <>
      <div className="flex justify-around items-center w-full mb-5">
        <button className="bg-gray-400 py-2 px-4 rounded" onClick={() => navigate(-1)}>
          Back
        </button>

        <button
          onClick={downloadPDF}
          className="bg-blue-700 text-white py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-8 shadow">

        {/* Header */}
        {/* <div className="text-center mb-8">
          <h1 className="text-xl font-bold">KSR College of Engineering</h1>
          <p>{paper.subject}</p>

          <div className="flex justify-between mt-4 text-sm">
            <span>Time: 3 Hours</span>
            <span>Max Marks: 100</span>
          </div>
        </div> */}

        {/* Questions */}
        {/* {/* <div className="space-y-8">
        <PartASection data={paper.partA} />
        <PartBSection data={paper.partB} />
        <PartCSection data={paper.partC} />
      </div>

        {/* <div className="space-y-8">

        {paper.pattern === "R24SEM" && (
          <>
            <SemPartASection data={paper.partA} />
            <SemPartBSection data={paper.partB} />
          </>
        )}

        {paper.pattern === "R24IA1" && (
          <>
            <IA1PartAGeneratedSection data={paper.partA} />
            <IA1PartBGeneratedSection data={paper.partB} />
          </>
        )}

      </div> */}


        {/* RIGHT PANEL */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="preview-zoom">


            {/* Pattern = REGULATION 24 - IA-1 */}
            {paper.pattern === "R24IA1" && (
              <div id="question-paper" className="a4-page text-black">

                {/* HEADER */}
                <div className="text-center mb-2">
                  <h1 className="text-xl font-bold">
                    K.S.R. College of Engineering, Tiruchengode - 637215
                  </h1>

                  <h5 className="text-sm mt-1">
                    (An Autonomous Institution, Affiliated to Anna University, Chennai)
                  </h5>

                  <h1 className="text-xl font-bold mt-2">
                    Internal Assessment - I
                  </h1>

                  <p className="mt-1 font-bold">
                    {paper.examDetails.degree} - {paper.examDetails.branch}
                  </p>

                  <p className="mt-1 font-bold">
                    {paper.examDetails.semester} Semester
                  </p>

                  <p className="mt-1 font-bold">
                    {paper.subject} - {paper.examDetails.courseName}
                  </p>

                  <h1 className="text-lg font-bold mt-2">
                    (Regulation - 2024)
                  </h1>

                  <div className="flex justify-between mt-6 text-sm">
                    <span className="font-bold">
                      Time: 1 Hours 30 Minutes
                    </span>

                    <div className="grid text-start">
                      <span className="font-bold">
                        Max Marks: 50
                      </span>
                      <span className="font-bold">
                        Date:
                      </span>
                    </div>
                  </div>
                </div>


                <IA1PartAGeneratedSection data={paper?.partA} />
                <IA1PartBGeneratedSection data={paper?.partB} />

                <h1 className="text-xl font-bold mt-2 mb-2 text-center">
                  BLOOM’S TAXONOMY LEVEL
                </h1>

                <table className="co-table text-[12px]">
                  <thead>
                    <tr>
                      <th>K1 - Remembering</th>
                      <th>K2 - Understanding</th>
                      <th>K3 - Applying</th>
                      <th>K4 - Analyzing</th>
                      <th>K5 - Evaluating</th>
                      <th>K6 - Creating</th>
                    </tr>
                  </thead>
                </table>
                <table className="cmpTable mt-10">
                  <thead>
                    <tr>
                      {/* <th></th> */}
                      <th>Course Instructor</th>
                      <th>Module Coordinator</th>
                      <th>HoD / Program Coordinator</th>
                    </tr>
                  </thead>
                </table>
                <div className="text-center mt-7">***********</div>

              </div>
            )}



            {/* Pattern = REGULATION 24 - IA-2 */}
            {paper.pattern === "R24IA2" && (
              <div id="question-paper" className="a4-page text-black">

                {/* HEADER */}
                <div className="text-center mb-2">
                  <h1 className="text-xl font-bold">
                    K.S.R. College of Engineering, Tiruchengode - 637215
                  </h1>

                  <h5 className="text-sm mt-1">
                    (An Autonomous Institution, Affiliated to Anna University, Chennai)
                  </h5>

                  <h1 className="text-xl font-bold mt-2">
                    Internal Assessment - II
                  </h1>

                  <p className="mt-1 font-bold">
                    {paper.examDetails.degree} - {paper.examDetails.branch}
                  </p>

                  <p className="mt-1 font-bold">
                    {paper.examDetails.semester} Semester
                  </p>

                  <p className="mt-1 font-bold">
                    {paper.subject} - {paper.examDetails.courseName}
                  </p>

                  <h1 className="text-lg font-bold mt-2">
                    (Regulation - 2024)
                  </h1>

                  <div className="flex justify-between mt-6 text-sm">
                    <span className="font-bold">
                      Time: 1 Hours 30 Minutes
                    </span>

                    <div className="grid text-start">
                      <span className="font-bold">
                        Max Marks: 50
                      </span>
                      <span className="font-bold">
                        Date:
                      </span>
                    </div>
                  </div>
                </div>


                <IA1PartAGeneratedSection data={paper?.partA} />
                <IA1PartBGeneratedSection data={paper?.partB} />

                <h1 className="text-xl font-bold mt-2 mb-2 text-center">
                  BLOOM’S TAXONOMY LEVEL
                </h1>

                <table className="co-table text-[12px]">
                  <thead>
                    <tr>
                      <th>K1 - Remembering</th>
                      <th>K2 - Understanding</th>
                      <th>K3 - Applying</th>
                      <th>K4 - Analyzing</th>
                      <th>K5 - Evaluating</th>
                      <th>K6 - Creating</th>
                    </tr>
                  </thead>
                </table>
                <table className="cmpTable mt-10">
                  <thead>
                    <tr>
                      {/* <th></th> */}
                      <th>Course Instructor</th>
                      <th>Module Coordinator</th>
                      <th>HoD / Program Coordinator</th>
                    </tr>
                  </thead>
                </table>
                <div className="text-center mt-7">***********</div>

              </div>
            )}



            {/* PATTERN = REGULATION 24 - SEMESTER */}

            {paper.pattern === "R24SEM" && (

              <div id="question-paper" className="a4-page text-black">

                {/* HEADER */}
                <div className="text-center mb-2">
                  <h1 className="text-xl font-bold">
                    K.S.R. College of Engineering, Tiruchengode - 637215
                  </h1>

                  <h5 className="text-sm mt-1">
                    (An Autonomous Institution, Affiliated to Anna University, Chennai)
                  </h5>

                  <h1 className="text-xl font-bold mt-2">
                    End Semester
                  </h1>

                  <p className="mt-1 font-bold">
                    {paper.examDetails.degree} - {paper.examDetails.branch}
                  </p>

                  <p className="mt-1 font-bold">
                    {paper.examDetails.semester} Semester
                  </p>

                  <p className="mt-1 font-bold">
                    {paper.subject} - {paper.examDetails.courseName}
                  </p>

                  <h1 className="text-lg font-bold mt-2">
                    (Regulation - 2024)
                  </h1>

                  <div className="flex justify-between mt-6 text-sm">
                    <span className="font-bold">
                      Time: 1 Hours 30 Minutes
                    </span>

                    <div className="grid text-start">
                      <span className="font-bold">
                        Max Marks: 50
                      </span>
                      <span className="font-bold">
                        Date:
                      </span>
                    </div>
                  </div>
                </div>

                <PartASection data={paper?.partA} />
                <PartBSection data={paper?.partB} />

                <h1 className="text-xl font-bold mt-2 mb-2 text-center">
                  BLOOM’S TAXONOMY LEVEL
                </h1>

                <table className="co-table text-[12px]">
                  <thead>
                    <tr>
                      <th>K1 - Remembering</th>
                      <th>K2 - Understanding</th>
                      <th>K3 - Applying</th>
                      <th>K4 - Analyzing</th>
                      <th>K5 - Evaluating</th>
                      <th>K6 - Creating</th>
                    </tr>
                  </thead>
                </table>
                <table className="cmpTable mt-10">
                  <thead>
                    <tr>
                      {/* <th></th> */}
                      <th>Course Instructor</th>
                      <th>Module Coordinator</th>
                      <th>HoD / Program Coordinator</th>
                    </tr>
                  </thead>
                </table>
                <div className="text-center mt-7">***********</div>
              </div>
            )}


            {/* PATTERN =  REGULATION 20 - IA1 */}
            {paper.pattern === "R20IA1" && (
              <div id="question-paper" className="a4-page text-black">

                {/* HEADER */}
                <div className="text-center mb-2">
                  <h1 className="text-xl font-bold">
                    K.S.R. College of Engineering, Tiruchengode - 637215
                  </h1>

                  <h5 className="text-sm mt-1">
                    (An Autonomous Institution, Affiliated to Anna University, Chennai)
                  </h5>

                  <h1 className="text-xl font-bold mt-2">
                    Internal Assessment - I
                  </h1>

                  <p className="mt-1 font-bold">
                    {paper.examDetails.degree} - {paper.examDetails.branch}
                  </p>

                  <p className="mt-1 font-bold">
                    {paper.examDetails.semester} Semester
                  </p>

                  <p className="mt-1 font-bold">
                    {paper.subject} - {paper.examDetails.courseName}
                  </p>

                  <h1 className="text-lg font-bold mt-2">
                    (Regulation - 2024)
                  </h1>

                  <div className="flex justify-between mt-6 text-sm">
                    <span className="font-bold">
                      Time: 1 Hours 30 Minutes
                    </span>

                    <div className="grid text-start">
                      <span className="font-bold">
                        Max Marks: 50
                      </span>
                      <span className="font-bold">
                        Date:
                      </span>
                    </div>
                  </div>
                </div>
                {/* <> */}
                <IA1PartAGeneratedSection data={paper?.partA} />
                <R20IAPartBGeneratedsection data={paper?.partB} />
                {/* </> */}

                <h1 className="text-xl font-bold mt-2 mb-2 text-center">
                  BLOOM’S TAXONOMY LEVEL
                </h1>

                <table className="co-table text-[12px]">
                  <thead>
                    <tr>
                      <th>K1 - Remembering</th>
                      <th>K2 - Understanding</th>
                      <th>K3 - Applying</th>
                      <th>K4 - Analyzing</th>
                      <th>K5 - Evaluating</th>
                      <th>K6 - Creating</th>
                    </tr>
                  </thead>
                </table>
                <table className="cmpTable mt-10">
                  <thead>
                    <tr>
                      {/* <th></th> */}
                      <th>Course Instructor</th>
                      <th>Module Coordinator</th>
                      <th>HoD / Program Coordinator</th>
                    </tr>
                  </thead>
                </table>
                <div className="text-center mt-7">***********</div>
              </div>
            )}


            {/* PATTERN = REGULATION 20 - IA2 */}
            {paper.pattern === "R20IA2" && (
              <>
                <IA1PartAGeneratedSection data={paper?.partA} />
                <R20IAPartBGeneratedsection data={paper?.partB} />
              </>
            )}


            {/* PATTERN = REGULATION 20 SEMESTER */}
            {paper.pattern === "R20SEM" && (
              <>
                <PartASection data={paper?.partA} />
                <PartBSection data={paper?.partB} />
              </>
            )}


          </div>
        </div>

      </div>
    </>
  );
}
