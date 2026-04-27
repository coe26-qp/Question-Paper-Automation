export default function R20IAPartBGeneratedsection({ data }) {
  if (!data) return null;

  const questions = Object.entries(data);
  let questionNumber = 1;

  return (
    <section className="mt-10 text-sm leading-relaxed">
      
      {/* Heading */}
      <h2 className="text-center font-bold text-base mb-1">
        PART – B (40 Marks)
      </h2>

      <p className="text-center mb-6 font-semibold">
        Answer ALL Questions
      </p>

      <div className="space-y-8">
        {questions.map(([key, value]) => {
          const { a, b } = value;

          const renderQuestion = (label, q) => {
            const isImage =
              typeof q.question === "string" &&
              q.question.length > 200;

            return (
              <div className="flex items-start mb-3" key={q._id}>
                <p className="w-[6%]">
                  {label})
                </p>

                <div className="w-[64%]">
                  {isImage ? (
                    <img
                      src={`data:image/png;base64,${q.question}`}
                      alt="Question"
                      className="max-w-[420px] border rounded"
                    />
                  ) : (
                    <p>{q.question}</p>
                  )}
                </div>

                <p className="w-[10%] text-right">
                  {q.marks}
                </p>

                <p className="w-[6%] text-right">
                  CO{q.co}
                </p>

                <p className="w-[6%] text-right">
                  K{q.bloomsTaxonomy}
                </p>
              </div>
            );
          };

          return (
            <div key={key}>

              {/* Question Number */}
              <div className="flex items-start">
                <p className="w-[6%] font-semibold">
                  {questionNumber++}.
                </p>

                <div className="w-[94%]">

                  {/* A */}
                  {renderQuestion("a", a)}

                  {/* OR */}
                  <p className="text-center font-semibold my-2">
                    (OR)
                  </p>

                  {/* B */}
                  {renderQuestion("b", b)}

                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}




// export default function R20IAPartBGeneratedsection({ data }) {
//   if (!data) return null;

//   const questions = Object.entries(data);
//   let questionNumber = 1;

//   // real base64 detector
//   const isBase64Image = (str) => {
//     if (!str || typeof str !== "string") return false;

//     return (
//       str.startsWith("iVBOR") ||   // png
//       str.startsWith("/9j/") ||    // jpg
//       str.startsWith("R0lGOD") ||  // gif
//       str.startsWith("UklGR")      // webp
//     );
//   };

//   return (
//     <section className="mt-10 text-sm leading-relaxed">

//       {/* Heading */}
//       <h2 className="text-center font-bold text-base mb-1">
//         PART – B (40 Marks)
//       </h2>

//       <p className="text-center mb-6 font-semibold">
//         Answer ALL Questions
//       </p>

//       <div className="space-y-8">
//         {questions.map(([key, value]) => {
//           const { a, b } = value;

//           const renderQuestion = (label, q) => {
//             const showImage = isBase64Image(q?.questionImage);
//             const showText = !showImage || q?.question;

//             return (
//               <div className="flex items-start mb-3" key={q?._id}>
//                 <p className="w-[6%]">
//                   {label})
//                 </p>

//                 <div className="w-[64%]">

//                   {/* TEXT */}
//                   {showText && (
//                     <p className="whitespace-pre-line">
//                       {q?.question}
//                     </p>
//                   )}

//                   {/* IMAGE */}
//                   {showImage && (
//                     <img
//                       src={`data:image/png;base64,${q.questionImage}`}
//                       alt="Question"
//                       className="max-w-[420px] border rounded mt-2"
//                     />
//                   )}

//                 </div>

//                 <p className="w-[10%] text-right">
//                   {q?.marks}
//                 </p>

//                 <p className="w-[6%] text-right">
//                   CO{q?.co}
//                 </p>

//                 <p className="w-[6%] text-right">
//                   {q?.bloomsTaxonomy}
//                 </p>
//               </div>
//             );
//           };

//           return (
//             <div key={key}>

//               {/* Question Number */}
//               <div className="flex items-start">
//                 <p className="w-[6%] font-semibold">
//                   {questionNumber++}.
//                 </p>

//                 <div className="w-[94%]">

//                   {renderQuestion("a", a)}

//                   <p className="text-center font-semibold my-2">
//                     (OR)
//                   </p>

//                   {renderQuestion("b", b)}

//                 </div>
//               </div>

//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
