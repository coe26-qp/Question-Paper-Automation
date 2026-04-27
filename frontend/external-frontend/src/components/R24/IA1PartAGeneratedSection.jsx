import React from "react";

export default function IA1PartAGeneratedSection({ data }) {
  if (!data) return null;

  const questions = Object.values(data);
  let questionNumber = 1;

  return (
    <section className="mt-2">
      <h2 className="text-center font-bold mb-1">
        PART A - (5 × 2 = 10 Marks)
      </h2>

      <p className="text-center mb-4 font-semibold">
        Answer ALL questions
      </p>

      {questions.map((q) => (
        <div key={q._id} className="question-block">

          <table className="question-table">
            <tbody>
              <tr>
                <td style={{ width: "6%" }}>
                  {questionNumber++}.
                </td>

                <td style={{ width: "70%"}}>

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

                <td style={{ width: "5%"}} className="text-center">
                  2
                </td>

                <td style={{ width: "5%"}} className="text-center">
                  CO{q.co}
                </td>

                <td style={{ width: "5%" }} className="text-right">
                  K{q.bloomsTaxonomy}
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      ))}
    </section>
  );
}