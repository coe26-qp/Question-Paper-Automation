// export default function PartAGeneratedSection({ data }) {
//   if (!data) return null;
//   let questionNumber = 1;

//   return (
//     <section className="mt-6 text-sm leading-relaxed">
//       {/* Title */}
//       <h2 className="text-center font-bold text-base mb-1">
//         PART – A (10 × 2 = 20 Marks)
//       </h2>

//       <p className="text-center mb-4 font-semibold">
//         Answer ALL questions
//       </p>

//       <div className="space-y-2">
//         {Object.entries(data).map(([coKey, coData]) => {
//           const questions = [coData.part1, coData.part2];

//           return questions.map((q) => {
//             const isImage =
//               typeof q.question === "string" && q.question.length > 200;

//             return (
//               <div key={q._id} className="flex items-start">
//                 {/* Question No */}
//                 <p className="w-[6%]">
//                   {questionNumber++}.
//                 </p>

//                 {/* Question (TEXT or IMAGE) */}
//                 <div className="w-[64%]">
//                   {isImage ? (
//                     <img
//                       src={`data:image/png;base64,${q.question}`}
//                       alt="Question"
//                       className="max-w-full border rounded"
//                     />
//                   ) : (
//                     <p>{q.question}</p>
//                   )}
//                 </div>

//                 {/* Marks */}
//                 <p className="w-[10%] text-right">
//                   2
//                 </p>

//                 {/* CO */}
//                 <p className="w-[6%] text-right">
//                   {coKey}
//                 </p>

//                 {/* Bloom */}
//                 <p className="w-[6%] text-right">
//                   {q.bloomsTaxonomy}
//                 </p>
//               </div>
//             );
//           });
//         })}
//       </div>
//     </section>
//   );
// }



// export default function PartAGeneratedSection({ data }) {
//   if (!data) return null;

//   let questionNumber = 1;

//   return (
//     <section className="mt-6 text-sm leading-relaxed">
//       {/* Title */}
//       <h2 className="text-center font-bold text-base mb-1">
//         PART – A (10 × 2 = 20 Marks)
//       </h2>

//       <p className="text-center mb-4 font-semibold">
//         Answer ALL questions
//       </p>

//       <div className="space-y-3">
//         {Object.entries(data).map(([coKey, coData]) => {
//           const questions = [coData.part1, coData.part2];

//           return questions.map((q) => (
//             <div key={q._id} className="flex items-start">

//               {/* Question Number */}
//               <p className="w-[6%]">
//                 {questionNumber++}.
//               </p>

//               {/* Question Content */}
//               <div className="w-[64%] space-y-2">

//                 {/* TEXT */}
//                 {q.question && (
//                   <p className="whitespace-pre-line">
//                     {q.question}
//                   </p>
//                 )}

//                 {/* IMAGE */}
//                 {q.questionImage && (
//                   <img
//                     src={`data:image/png;base64,${q.questionImage}`}
//                     alt="Question"
//                     className="max-w-full border rounded shadow-sm"
//                   />
//                 )}

//               </div>

//               {/* Marks */}
//               <p className="w-[10%] text-right">
//                 2
//               </p>

//               {/* CO */}
//               <p className="w-[6%] text-right">
//                 {coKey}
//               </p>

//               {/* Bloom */}
//               <p className="w-[6%] text-right">
//                 K{q.bloomsTaxonomy}
//               </p>

//             </div>
//           ));
//         })}
//       </div>
//     </section>
//   );
// }




import React from "react";

export default function PartAGeneratedSection({ data }) {
  if (!data) return null;

  let questionNumber = 1;

  return (
    <section className="mt-2">
      {/* Title */}
      <h2 className="text-center font-bold mb-1">
        PART – A (10 × 2 = 20 Marks)
      </h2>

      <p className="text-center mb-4 font-semibold">
        Answer ALL questions
      </p>

      {Object.entries(data).map(([coKey, coData]) => {
        const questions = [coData.part1, coData.part2];

        return questions.map((q) => (
          <div key={q._id} className="question-block">

            <table className="question-table">
              <tbody>
                <tr>
                  {/* Question Number */}
                  <td style={{ width: "6%" }}>
                    {questionNumber++}.
                  </td>

                  {/* Question Content */}
                  <td style={{ width: "70%" }}>

                    {/* TEXT */}
                    {q.question && (
                      <p className="whitespace-pre-line">
                        {q.question}
                      </p>
                    )}

                    {/* IMAGE */}
                    {q.questionImage && (
                      <div className="image-block">
                        <img
                          src={`data:image/png;base64,${q.questionImage}`}
                          alt="Question"
                        />
                      </div>
                    )}

                  </td>

                  {/* Marks */}
                  <td style={{ width: "5%" }} className="text-center">
                    {q.marks}
                  </td>

                  {/* CO */}
                  <td style={{ width: "5%" }} className="text-center">
                    {coKey}
                  </td>

                  {/* Bloom */}
                  <td style={{ width: "5%" }} className="text-right">
                    K{q.bloomsTaxonomy}
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        ));
      })}
    </section>
  );
}