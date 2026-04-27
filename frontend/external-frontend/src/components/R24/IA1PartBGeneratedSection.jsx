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

export default function IA1PartBGeneratedSection({ data }) {
  if (!data) return null;

  const questions = Object.entries(data);
  let questionNumber = 6;

  return (
    // <section className="mt-[780px] text-sm leading-relaxed">
    // <section className="mt-[360px] text-sm leading-relaxed">
    // <section className="mt-96 text-sm leading-relaxed">
    <section className="mt-20 text-sm leading-relaxed">

      <h2 className="text-center font-bold text-base mb-1">
        PART B - (5 × 8 = 40 Marks)
      </h2>

      <p className="text-center mb-4 font-semibold">
        Answer any two from Q.NO.6 & 7, any one from Q.NO.8
      </p>

      {questions.map(([key, value]) => {
        const subs = Object.entries(value);

        const currentNumber = questionNumber++; // ✅ preserve your logic

        return (
          <div key={key} className="question-block mb-2">

            <table className="question-table">
              <tbody>

                {/* FIRST ROW (contains main question number) */}
                {subs.map(([subKey, q], index) => {

                  if (!q) return null;

                  const text =
                    q.questionText ||
                    (!isBase64Image(q.question) ? q.question : null);

                  const image =
                    q.questionImage ||
                    (isBase64Image(q.question) ? q.question : null);

                  const cleanedBase64 = image
                    ? image.replace(/\s/g, "")
                    : null;

                  return (
                    <tr key={q._id}>


                      {/* {index === 0 && (
                        <td
                          rowSpan={subs.length}
                          style={{
                            width: "2%",
                            fontWeight: "bold",
                            verticalAlign: "top",
                            backgroundColor: "grey"
                          }}
                        >
                          {currentNumber}.
                        </td>
                      )}

                      <td style={{ width: "3%", textAlign : "center", verticalAlign: "top", backgroundColor: "red"}}>
                        {subKey})
                      </td> */}

                      {/* Question Number */}
                      <td
                        style={{
                          width: "2%",
                          fontWeight: "bold",
                          verticalAlign: "top",

                        }}
                      >
                        {index === 0 ? `${currentNumber}.` : ""}
                      </td>

                      <td
                        style={{
                          width: "3%",
                          textAlign: "center",
                          verticalAlign: "top",

                        }}
                      >
                        {subKey})
                      </td>

                      {/* Question content */}
                      <td style={{ width: "70%", verticalAlign: "top" }}>
                        <div className="no-break">

                          {text && (
                            <p className="whitespace-pre-line text-justify mb-2 question-content">
                              {text}
                            </p>
                          )}

                          {cleanedBase64 && (
                            <div className="image-block sub-question question-content">
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
                                  // marginTop: "100px"
                                }}
                                onError={(e) => {
                                  e.target.outerHTML =
                                    `<p style="color:red">[Invalid image data]</p>`;
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
                        8
                      </td>

                      {/* CO */}
                      <td
                        style={{
                          width: "5%",
                          textAlign: "center",
                          verticalAlign: "top",

                        }}
                      >
                        CO{q.co}
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