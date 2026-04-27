// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import html2pdf from "html2pdf.js";

// import PartASection from "../components/R24/SemPartAGeneratedSection";
// import PartBSection from "../components/R24/SemPartBGeneratedSection";
// import IA1PartAGeneratedSection from "../components/R24/IA1PartAGeneratedSection";
// import IA1PartBGeneratedSection from "../components/R24/IA1PartBGeneratedSection";
// import R20IAPartBGeneratedsection from "../components/R20/R20IAPartBGeneratedsection";

// export default function GeneratedQuestionPaperPreview() {
//   const { state } = useLocation();
//   const paperId = state?.paperId || localStorage.getItem("paperId");

//   const [paper, setPaper] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   /* ---------------- FETCH PAPER ---------------- */
//   useEffect(() => {
//     if (!paperId) return;

//     const fetchPaper = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/paper-generation/fetchQuestionPaper/${paperId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//             },
//           }
//         );
//         setPaper(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaper();
//   }, [paperId]);

//   /* ---------------- REGENERATE ---------------- */
//   const regeneratePartA = async () => {
//     const res = await axios.post(
//       `http://localhost:5000/api/paper-generation/generate/partA/${paperId}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//         },
//       }
//     );

//     setPaper((prev) => ({ ...prev, partA: res.data.partA }));
//   };

//   const regeneratePartB = async () => {
//     const res = await axios.post(
//       `http://localhost:5000/api/paper-generation/generate/partB/${paperId}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
//         },
//       }
//     );

//     setPaper((prev) => ({ ...prev, partB: res.data.partB }));
//   };

//   /* ---------------- PDF DOWNLOAD ---------------- */
//   // const downloadPDF = async () => {
//   //   const element = document.getElementById("question-paper");

//   //   if (!element) {
//   //     alert("Question paper content not found");
//   //     return;
//   //   }

//   //   await new Promise((r) => setTimeout(r, 600));
//   //   await new Promise((r) => requestAnimationFrame(r));

//   //   const images = element.querySelectorAll("img");
//   //   await Promise.all(
//   //     Array.from(images).map(
//   //       (img) =>
//   //         new Promise((resolve) => {
//   //           if (img.complete && img.naturalHeight !== 0) resolve();
//   //           else img.onload = img.onerror = resolve;
//   //         })
//   //     )
//   //   );

//   //   const options = {
//   //     margin: [20, 10, 20, 10],  // top, left, bottom, right
//   //     filename: "question_paper.pdf",
//   //     image: { type: "jpeg", quality: 0.98 },
//   //     html2canvas: { scale: 2, useCORS: true },
//   //     jsPDF: {
//   //       unit: "mm",
//   //       format: "a4",
//   //       orientation: "portrait",
//   //     },
//   //     pagebreak: { mode: ["avoid-all", "css", "legacy"] },
//   //   };

//   //   await html2pdf().set(options).from(element).save();
//   // };


//   const downloadPDF = async () => {
//     const element = document.getElementById("question-paper");

//     if (!element) {
//       alert("Question paper content not found");
//       return;
//     }

//     // 🔥 REMOVE ZOOM BEFORE EXPORT
//     element.classList.remove("preview-zoom");

//     await new Promise((r) => setTimeout(r, 600));
//     await new Promise((r) => requestAnimationFrame(r));

//     const images = element.querySelectorAll("img");
//     await Promise.all(
//       Array.from(images).map(
//         (img) =>
//           new Promise((resolve) => {
//             if (img.complete && img.naturalHeight !== 0) resolve();
//             else img.onload = img.onerror = resolve;
//           })
//       )
//     );


//     const options = {
//       // margin: 0,
//       margin: [20, 10, 20, 10],
//       filename: `${paper.subject}-${paper.examDetails.courseName}-${paper.pattern}.pdf`,
//       image: { type: "jpeg", quality: 1 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         scrollY: 0
//       },
//       jsPDF: {
//         unit: "mm",
//         format: "a4",
//         orientation: "portrait",
//       },
//       pagebreak: {
//         mode: ["css", "legacy"]  // ❗ REMOVE avoid-all
//       }
//     };

// //     const options = {
// //   margin: 0,   // ✅ VERY IMPORTANT
// //   filename: `${paper.subject}-${paper.examDetails.courseName}-${paper.pattern}.pdf`,
// //   image: { type: "jpeg", quality: 1 },
// //   html2canvas: {
// //     scale: 2,
// //     useCORS: true,
// //     scrollY: 0
// //   },
// //   jsPDF: {
// //     unit: "mm",
// //     format: "a4",
// //     orientation: "portrait",
// //   },
// //   pagebreak: {
// //     mode: ["css"]   // ✅ REMOVE legacy
// //   }
// // };

//     await html2pdf().set(options).from(element).save();

//     // 🔥 ADD ZOOM BACK AFTER DOWNLOAD
//     element.classList.add("preview-zoom");
//   };
//   if (loading) return <p className="p-6">Loading question paper...</p>;
//   if (!paper) return <p className="p-6 text-red-600">Question paper not found</p>;

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* LEFT PANEL */}
//       <div className="w-64 bg-white shadow-lg p-4 sticky top-0 h-screen">
//         <h2 className="text-lg font-semibold mb-6 text-center">Actions</h2>

//         <div className="flex flex-col gap-4">
//           <button onClick={() => navigate(-1)} className="bg-green-600 text-white py-2 rounded">Back</button>
//           <button onClick={regeneratePartA} className="bg-green-600 text-white py-2 rounded">Regenerate Part A</button>
//           <button onClick={regeneratePartB} className="bg-green-600 text-white py-2 rounded">Regenerate Part B</button>
//           <button onClick={downloadPDF} className="bg-blue-700 text-white py-2 rounded">Download PDF</button>
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="flex-1 overflow-y-auto p-8">
//         <div className="preview-zoom">
//           <div id="question-paper" className="a4-page text-black">

//             {/* HEADER */}
//             <div className="text-center mb-10">
//               <h1 className="text-xl font-bold">K.S. R. College of Engineering, Tiruchengode - 637215</h1>
//               <h5 className="text-sm mt-1">(An Autonomous Institution, Affliated to Anna University, Chennai)</h5>
//               <h1 className="text-xl font-bold mt-2">Internal Assessment - I</h1>
//               <p className="mt-1 font-bold">{paper.examDetails.degree} - {paper.examDetails.branch}</p>
//               <p className="mt-1 font-bold">{paper.subject} - {paper.examDetails.courseName}</p>
//               <h1 className="text-lg font-bold mt-2">(Regulation - 2024)</h1>
//               <div className="flex justify-around space-x-52 mt-6 text-sm">
//                 <span className="font-bold">Time: 1 Hours 30 Minutes</span>
//                 <span className="font-bold">Max Marks: 50</span>

//               </div>

//             </div>

//             {/* PATTERN RENDERING */}
//             {paper.pattern === "R24SEM" && (
//               <>
//                 <PartASection data={paper?.partA} />
//                 <PartBSection data={paper?.partB} />
//               </>
//             )}

//             {paper.pattern === "R24IA1" && (
//               <>
//                 <IA1PartAGeneratedSection data={paper?.partA} />
//                 <IA1PartBGeneratedSection data={paper?.partB} />
//                 <h1 className="text-xl font-bold mt-3 mb-4 text-center">
//                 Course Outcomes
//               </h1>

//               <table className="co-table">
//                 <thead>
//                   <tr>
//                     <th>K1 - Remembering</th>
//                     <th>K2 - Understanding</th>
//                     <th>K3 - Applying</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr className="font-semibold">
//                     <td>K4 - Analyzing</td>
//                     <td>K5 - Evaluating</td>
//                     <td>K6 - Creating</td>
//                   </tr>
//                 </tbody>
//               </table>
//               </>
//             )}

//             {paper.pattern === "R20IA1" && (
//               <>
//                 <IA1PartAGeneratedSection data={paper?.partA} />
//                 <R20IAPartBGeneratedsection data={paper?.partB} />
//               </>
//             )}

//             {paper.pattern === "R20IA2" && (
//               <>
//                 <IA1PartAGeneratedSection data={paper?.partA} />
//                 <R20IAPartBGeneratedsection data={paper?.partB} />
//               </>
//             )}

//             {paper.pattern === "R20SEM" && (
//               <>
//                 <PartASection data={paper?.partA} />
//                 <PartBSection data={paper?.partB} />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

import PartASection from "../components/R24/SemPartAGeneratedSection";
import PartBSection from "../components/R24/SemPartBGeneratedSection";
import IA1PartAGeneratedSection from "../components/R24/IA1PartAGeneratedSection";
import IA1PartBGeneratedSection from "../components/R24/IA1PartBGeneratedSection";
import R20IAPartBGeneratedsection from "../components/R20/R20IAPartBGeneratedsection";

export default function GeneratedQuestionPaperPreview() {
  const { state } = useLocation();
  const paperId = state?.paperId || localStorage.getItem("paperId");

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ---------------- FETCH PAPER ---------------- */
  useEffect(() => {
    if (!paperId) return;

    const fetchPaper = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/paper-generation/fetchQuestionPaper/${paperId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
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

    fetchPaper();
  }, [paperId]);

  /* ---------------- REGENERATE ---------------- */
  const regeneratePartA = async () => {
    const res = await axios.post(
      `http://localhost:5000/api/paper-generation/generate/partA/${paperId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
        },
      }
    );

    setPaper((prev) => ({ ...prev, partA: res.data.partA }));
  };

  const regeneratePartB = async () => {
    const res = await axios.post(
      `http://localhost:5000/api/paper-generation/generate/partB/${paperId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("externalToken")}`,
        },
      }
    );

    setPaper((prev) => ({ ...prev, partB: res.data.partB }));
  };

  /* ---------------- PDF DOWNLOAD ---------------- */
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

  if (loading) return <p className="p-6">Loading question paper...</p>;
  if (!paper) return <p className="p-6 text-red-600">Question paper not found</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT PANEL */}
      <div className="w-64 bg-white shadow-lg p-4 sticky top-0 h-screen">
        <h2 className="text-lg font-semibold mb-6 text-center">Actions</h2>

        <div className="flex flex-col gap-4">
          <button onClick={() => navigate(-1)} className="bg-green-600 text-white py-2 rounded">
            Back
          </button>

          <button onClick={regeneratePartA} className="bg-green-600 text-white py-2 rounded">
            Regenerate Part A
          </button>

          <button onClick={regeneratePartB} className="bg-green-600 text-white py-2 rounded">
            Regenerate Part B
          </button>

          <button onClick={downloadPDF} className="bg-blue-700 text-white py-2 rounded">
            Download PDF
          </button>
        </div>
      </div>

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
  );
}