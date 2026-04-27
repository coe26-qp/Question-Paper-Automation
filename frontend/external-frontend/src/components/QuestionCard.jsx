// export default function QuestionCard({ q, index, onApprove, onFreeze, onEdit, onDeApprove }) {

//   // ✅ Dynamic background based on status
//   const bgColor = q.frozen
//     ? "bg-red-50"
//     : q.approved
//       ? "bg-green-50"
//       : "bg-white";

//   return (
//     <div className={`${bgColor} border rounded-lg p-5 flex justify-between gap-4`}>

//       {/* LEFT CONTENT */}
//       <div className="flex-1 pr-4">

//         {/* HEADER */}
//         <div className="flex items-center gap-5 mb-2">
//           <h2 className="text-lg font-semibold">Q: {index + 1}</h2>
//           <p className="text-sm text-gray-500">
//             Unit: {q.unitTitle || "-"}
//           </p>


//           <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 font-bold">
//             {q.marks} Marks
//           </span>

//           <span className={`text-xs px-2 py-1 rounded
//             ${q.frozen
//               ? "bg-red-100 text-red-700"
//               : q.approved
//                 ? "bg-green-100 text-green-700"
//                 : "bg-yellow-100 text-yellow-700"
//             }`}>
//             {q.frozen ? "FROZEN" : q.approved ? "APPROVED" : "PENDING"}
//           </span>

//         </div>

//         {/* QUESTION */}
//         {q.question && (
//           <p className="text-gray-800 mb-3 leading-relaxed">
//             {q.question}
//           </p>
//         )}

//         {/* IMAGE */}
//         {q.questionImage && (
//           <img
//             src={`data:image/png;base64,${q.questionImage}`}
//             alt="Question"
//             className="mb-3 max-w-full border rounded"
//           />
//         )}

//         {/* METADATA */}
//         <div className="border-t pt-2 mt-2 text-sm flex flex-wrap gap-4">
//           <span><b>CO:</b> {q.co}</span>
//           <span><b>BT:</b> {q.bloomsTaxonomy}</span>
//           <span><b>Level:</b> {q.level}</span>
//           <span><b>Part:</b> P{q.part}</span>
//           <span><b>Type:</b> {q.type}</span>
//         </div>

//       </div>

//       {/* RIGHT ACTION PANEL */}
//       {!q.frozen && (
//         <div className="w-[120px] flex flex-col gap-2 text-sm">

//           <button
//             onClick={() => onEdit(q)}
//             className="w-full px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
//           >
//             Edit
//           </button>

//           {!q.approved && (
//             <button
//               onClick={() => onApprove(q._id)}
//               className="w-full px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200"
//             >
//               Approve
//             </button>
//           )}

//           <button
//             onClick={() => onDeApprove(q._id)}
//             className="w-full px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
//           >
//             De-Approve
//           </button>

//           <button
//             onClick={() => onFreeze(q._id)}
//             className="w-full px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
//           >
//             Freeze
//           </button>

//         </div>
//       )}

//     </div>
//   );
// }




export default function QuestionCard({
  q,
  index,
  onApprove,
  onFreeze,
  onEdit,
  onDeApprove,
}) {

  const status = q.frozen
    ? { text: "FROZEN", color: "bg-red-500" }
    : q.approved
      ? { text: "APPROVED", color: "bg-green-500" }
      : { text: "PENDING", color: "bg-yellow-500" };

  return (
    <div className="border rounded-lg p-5 flex justify-between gap-6 bg-white hover:shadow-md transition">

      {/* LEFT */}
      <div className="flex-1">

        {/* TOP BAR */}
        <div className="flex items-center gap-3 mb-3">

          <span className="font-semibold text-gray-800">
            Q{index + 1}
          </span>

          <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
            {q.unitTitle || "No Unit"}
          </span>

          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold">
            {q.marks} Marks
          </span>

          <span className={`text-xs px-2 py-1 rounded text-white ${status.color}`}>
            {status.text}
          </span>

        </div>

        {/* QUESTION */}
        <div className="text-gray-900 mb-3 leading-relaxed">
          {q.question}
        </div>

        {/* IMAGE */}
        {q.questionImage && (
          <img
            src={`data:image/png;base64,${q.questionImage}`}
            alt="question"
            className="mb-3 max-h-[220px] border rounded"
          />
        )}

        {/* META */}
        <div className="text-xs text-gray-600 flex flex-wrap gap-4 border-t pt-3">

          <span>CO: <b>{q.co}</b></span>
          <span>BT: <b>{q.bloomsTaxonomy}</b></span>
          <span>Level: <b>{q.level}</b></span>
          <span>Part: <b>P{q.part}</b></span>
          <span>Type: <b>{q.type}</b></span>

        </div>
      </div>

      {/* RIGHT ACTIONS */}
      {!q.frozen && (
        <div className="w-[120px] flex flex-col gap-2">

          <button
            onClick={() => onEdit(q)}
            className="text-sm px-3 py-1 rounded border hover:bg-gray-100"
          >
            Edit
          </button>

          {!q.approved ? (
            <button
              onClick={() => onApprove(q._id)}
              className="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Approve
            </button>
          ) : (
            <button
              onClick={() => onDeApprove(q._id)}
              className="text-sm px-3 py-1 rounded bg-orange-500 text-white hover:bg-orange-600"
            >
              De-Approve
            </button>
          )}

          <button
            onClick={() => onFreeze(q._id)}
            className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Freeze
          </button>

        </div>
      )}

      {/* FROZEN STATE */}
      {q.frozen && (
        <div className="w-[120px] flex items-center justify-center text-red-600 font-bold text-sm">
          FROZEN
        </div>
      )}

    </div>
  );
}