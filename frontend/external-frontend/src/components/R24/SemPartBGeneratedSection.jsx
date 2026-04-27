// import React from "react";

// /* Detect whether a string is really a base64 image */
// const isBase64Image = (str) => {
//   if (!str || typeof str !== "string") return false;

//   const cleaned = str.trim();

//   return (
//     cleaned.startsWith("data:image") ||
//     cleaned.startsWith("iVBOR") ||
//     cleaned.startsWith("/9j/") ||
//     cleaned.startsWith("R0lGOD")
//   );
// };

// export default function SemPartBGeneratedSection({ data }) {
//   if (!data) return null;

//   let questionNumber = 11;

//   return (
//     <section className="mt-20 text-sm leading-relaxed">

//       <h2 className="text-center font-bold text-base mb-1">
//         PART – B (5 × 16 = 80 Marks)
//       </h2>

//       <p className="text-center mb-5 font-semibold">
//         Answer ANY TWO sub-divisions
//       </p>

//       {Object.entries(data).map(([coKey, coData]) => {

//         // ✅ ONLY VALID QUESTIONS (IMPORTANT FIX)
//         const subs = Object.entries({
//           a: coData.a,
//           b: coData.b,
//           c: coData.c,
//         }).filter(([_, q]) => q);

//         const currentNumber = questionNumber++;

//         return (
//           <div key={coKey} className="question-block mb-3">

//             <table className="question-table">
//               <tbody>

//                 {subs.map(([subKey, q], index) => {

//                   // ✅ TEXT FIX
//                   {/* const text =
//                     typeof q.question === "string" &&
//                     !isBase64Image(q.question)
//                       ? q.question
//                       : null;

//                   // ✅ IMAGE FIX (robust)
//                   const image =
//                     q.image ||
//                     (typeof q.question === "string" &&
//                     isBase64Image(q.question)
//                       ? q.question
//                       : null); */}

//                   const text =
//                     q.questionText ||
//                     (!isBase64Image(q.question) ? q.question : null);

//                   const image =
//                     q.questionImage ||
//                     (isBase64Image(q.question) ? q.question : null);

//                   const cleanedBase64 = image
//                     ? image.replace(/\s/g, "")
//                     : null;

//                   return (
//                     <tr key={q._id || `${subKey}-${index}`}>

//                       {/* Question Number */}
//                       <td
//                         style={{
//                           width: "4%",
//                           fontWeight: "bold",
//                           verticalAlign: "top",
//                         }}
//                       >
//                         {index === 0 ? `${currentNumber}.` : ""}
//                       </td>

//                       {/* a / b / c */}
//                       <td
//                         style={{
//                           width: "4%",
//                           textAlign: "center",
//                           verticalAlign: "top",
//                         }}
//                       >
//                         {subKey})
//                       </td>

//                       {/* Content */}
//                       <td style={{ width: "67%", verticalAlign: "top" }}>
//                         <div className="no-break">

//                           {text && (
//                             <p className="whitespace-pre-line text-justify mb-2">
//                               {text}
//                             </p>
//                           )}

//                           {cleanedBase64 && (
//                             <div className="image-block">
//                               <img
//                                 src={
//                                   cleanedBase64.startsWith("data:image")
//                                     ? cleanedBase64
//                                     : `data:image/png;base64,${cleanedBase64}`
//                                 }
//                                 alt="Question"
//                               />
//                             </div>
//                           )}

//                         </div>
//                       </td>

//                       {/* Marks */}
//                       <td
//                         style={{
//                           width: "8%",
//                           textAlign: "center",
//                           verticalAlign: "top",
//                         }}
//                       >
//                         8
//                       </td>

//                       {/* CO */}
//                       <td
//                         style={{
//                           width: "8%",
//                           textAlign: "center",
//                           verticalAlign: "top",
//                         }}
//                       >
//                         CO{q.co || coKey}
//                       </td>

//                       {/* Bloom */}
//                       <td
//                         style={{
//                           width: "9%",
//                           textAlign: "right",
//                           verticalAlign: "top",
//                         }}
//                       >
//                         K{q.bloomsTaxonomy}
//                       </td>

//                     </tr>
//                   );
//                 })}

//               </tbody>
//             </table>

//           </div>
//         );
//       })}
//     </section>
//   );
// }












import React from "react";

/* Detect whether a string is really a base64 image */
const isBase64Image = (str) => {
  if (!str || typeof str !== "string") return false;

  const cleaned = str.trim();

  return (
    cleaned.startsWith("data:image") ||
    cleaned.startsWith("iVBOR") ||
    cleaned.startsWith("/9j/") ||
    cleaned.startsWith("R0lGOD")
  );
};

export default function SemPartBGeneratedSection({ data }) {
  if (!data) return null;

  let questionNumber = 11;

  return (
    <section className="mt-20 text-sm leading-relaxed">

      {/* Title */}
      <h2 className="text-center font-bold mb-1">
        PART – B (5 × 16 = 80 Marks)
      </h2>

      <p className="text-center mb-5 font-semibold">
        Answer ANY TWO sub-divisions
      </p>

      {Object.entries(data).map(([coKey, coData]) => {

        const subs = Object.entries({
          a: coData.a,
          b: coData.b,
          c: coData.c,
        }).filter(([_, q]) => q);

        const currentNumber = questionNumber++;

        return (
          <div key={coKey} className="question-block mb-4">

            <table className="question-table w-full">
              <tbody>

                {subs.map(([subKey, q], index) => {

                  if (!q) return null;

                  // ✅ TEXT
                  const text =
                    q.questionText ||
                    (!isBase64Image(q.question) ? q.question : null);

                  // ✅ IMAGE
                  const image =
                    q.questionImage ||
                    (isBase64Image(q.question) ? q.question : null);

                  const cleanedBase64 = image
                    ? image.replace(/\s/g, "")
                    : null;

                  return (
                    <tr key={q._id || `${subKey}-${index}`}>

                      {/* Question Number */}
                      <td
                        style={{
                          width: "6%",
                          fontWeight: "bold",
                          verticalAlign: "top",
                        }}
                      >
                        {index === 0 ? `${currentNumber}.` : ""}
                      </td>

                      {/* a / b / c */}
                      <td
                        style={{
                          width: "4%",
                          textAlign: "center",
                          verticalAlign: "top",
                        }}
                      >
                        {subKey})
                      </td>

                      {/* Content */}
                      <td
                        style={{
                          width: "72%",
                          verticalAlign: "top",
                        }}
                      >
                        <div className="no-break">

                          {/* TEXT */}
                          {text && (
                            <p className="whitespace-pre-line text-justify mb-2">
                              {text}
                            </p>
                          )}

                          {/* IMAGE */}
                          {cleanedBase64 && (
                            <div
                              className="image-block"
                              style={{
                                marginTop: "6px",
                              }}
                            >
                              <img
                                src={
                                  cleanedBase64.startsWith("data:image")
                                    ? cleanedBase64
                                    : `data:image/png;base64,${cleanedBase64}`
                                }
                                alt="Question"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  display: "block",
                                }}
                                onError={(e) => {
                                  e.target.outerHTML =
                                    `<p style="color:red">[Invalid image]</p>`;
                                }}
                              />
                            </div>
                          )}

                        </div>
                      </td>

                      {/* Marks */}
                      <td
                        style={{
                          width: "5%",
                          textAlign: "center",
                          verticalAlign: "top",
                        }}
                      >
                        {q.marks}
                      </td>

                      {/* CO */}
                      <td
                        style={{
                          width: "5%",
                          textAlign: "center",
                          verticalAlign: "top",
                        }}
                      >
                        CO{q.co || coKey}
                      </td>

                      {/* Bloom */}
                      <td
                        style={{
                          width: "5%",
                          textAlign: "right",
                          verticalAlign: "top",
                        }}
                      >
                        K{q.bloomsTaxonomy}
                      </td>

                    </tr>
                  );
                })}

              </tbody>
            </table>

          </div>
        );
      })}
    </section>
  );
}