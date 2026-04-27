// // Bold, itallic and underline is working but the bullet points, and numbering points is not working, Fix it and give me full code.

// import { useState } from "react";
// // import { Editor } from "react-simple-wysiwyg";
// // import "react-simple-wysiwyg/dist/style.css";
// import {
//     Editor,
//     EditorProvider,
//     Toolbar,
//     BtnBold,
//     BtnItalic,
//     BtnUnderline,
//     BtnBulletList,
//     BtnNumberedList
// } from "react-simple-wysiwyg";

// export default function AddQuestion() {
//     const [formData, setFormData] = useState({
//         unit: "",
//         co: "",
//         type: "D",
//         part: "",
//         question: "",
//         questionImage: "",
//         marks: "",
//         bloomsTaxonomy: "",
//         level: ""
//     });

//     // 🔹 Button select handler
//     const handleSelect = (field, value) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//             ...(field === "unit" && { co: value }) // CO = Unit
//         }));
//     };

//     // 🔹 Dropdown handler
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // 🔹 Image upload → base64
//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();
//         reader.readAsDataURL(file);

//         reader.onloadend = () => {
//             setFormData((prev) => ({
//                 ...prev,
//                 questionImage: reader.result
//             }));
//         };
//     };

//     // 🔹 Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await fetch(
//                 "http://localhost:5000/api/manual-faculty/add-question",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${localStorage.getItem("manualFacultyToken")}`
//                     },
//                     body: JSON.stringify(formData)
//                 }
//             );

//             const data = await res.json();

//             if (!res.ok) {
//                 alert(data.message || "Error");
//                 return;
//             }

//             alert("Question added ✅");

//             // reset
//             setFormData({
//                 unit: "",
//                 co: "",
//                 type: "D",
//                 part: "",
//                 question: "",
//                 questionImage: "",
//                 marks: "",
//                 bloomsTaxonomy: "",
//                 level: ""
//             });

//         } catch (err) {
//             alert("Server error");
//         }
//     };

//     // 🔹 Reusable button group
//     const ButtonGroup = ({ label, options, field }) => (
//         <div>
//             <p className="text-sm font-semibold mb-2 text-gray-600">{label}</p>
//             <div className="flex gap-2 flex-wrap">
//                 {options.map((opt) => (
//                     <button
//                         key={opt}
//                         type="button"
//                         onClick={() => handleSelect(field, opt)}
//                         className={`px-4 py-1 rounded-full border text-sm transition ${formData[field] === opt
//                             ? "bg-blue-600 text-white border-blue-600"
//                             : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                             }`}
//                     >
//                         {opt}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">
//                 Add New Question
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">

//                 {/* 🔹 Unit + CO */}
//                 <div className="grid grid-cols-2 gap-6">
//                     <ButtonGroup label="Unit" options={[1, 2, 3, 4, 5]} field="unit" />

//                     <div>
//                         <p className="text-sm font-semibold mb-2 text-gray-600">CO</p>
//                         <div className="px-4 py-2 border rounded bg-gray-100">
//                             {formData.co || "-"}
//                         </div>
//                     </div>
//                 </div>

//                 {/* 🔹 Type + Part */}
//                 <div className="grid grid-cols-2 gap-6">
//                     <ButtonGroup label="Type" options={["O", "D"]} field="type" />
//                     <ButtonGroup label="Part" options={[1, 2]} field="part" />
//                 </div>

//                 {/* 🔥 Question Section (MAIN) */}
//                 <div className="bg-gray-50 p-4 rounded-lg border">
//                     <p className="font-semibold mb-2 text-gray-700">Question</p>


//                         <EditorProvider>
//                             <div className="border rounded bg-white p-2 min-h-[200px]">

//                                 <Editor
//                                     value={formData.question}
//                                     onChange={(e) =>
//                                         setFormData((prev) => ({
//                                             ...prev,
//                                             question: e.target.value
//                                         }))
//                                     }
//                                 />
//                             </div>
//                         </EditorProvider>


//                     {/* Image */}
//                     <div className="mt-3">
//                         <input type="file" accept="image/*" onChange={handleImageUpload} />
//                     </div>

//                     {formData.questionImage && (
//                         <img
//                             src={formData.questionImage}
//                             alt="Preview"
//                             className="mt-3 w-48 border rounded"
//                         />
//                     )}
//                 </div>

//                 {/* 🔹 Bottom Row */}
//                 <div className="grid grid-cols-3 gap-4">

//                     <select name="marks"
//                         value={formData.marks}
//                         onChange={handleChange}
//                         className="border p-2 rounded">
//                         <option value="">Marks</option>
//                         <option value="2">2</option>
//                         <option value="8">8</option>
//                     </select>

//                     <select name="bloomsTaxonomy"
//                         value={formData.bloomsTaxonomy}
//                         onChange={handleChange}
//                         className="border p-2 rounded">
//                         <option value="">Blooms</option>
//                         {[1, 2, 3, 4, 5, 6].map(b => (
//                             <option key={b}>{b}</option>
//                         ))}
//                     </select>

//                     <select name="level"
//                         value={formData.level}
//                         onChange={handleChange}
//                         className="border p-2 rounded">
//                         <option value="">Level</option>
//                         <option value="L">Low</option>
//                         <option value="M">Medium</option>
//                         <option value="H">High</option>
//                     </select>

//                 </div>

//                 {/* Submit */}
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold">
//                     Add Question
//                 </button>

//             </form>
//         </div>
//     );
// }







// import { useState } from "react";

// export default function AddQuestion() {
//   const [formData, setFormData] = useState({
//     unit: "",
//     co: "",
//     type: "D",
//     part: "",
//     question: "",
//     questionImage: "",
//     marks: "",
//     bloomsTaxonomy: "",
//     level: ""
//   });

//   const handleSelect = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//       ...(field === "unit" && { co: value })
//     }));
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setFormData((prev) => ({
//         ...prev,
//         questionImage: reader.result
//       }));
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/manual-faculty/add-question", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("manualFacultyToken")}`
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Question added ✅");

//       setFormData({
//         unit: "",
//         co: "",
//         type: "D",
//         part: "",
//         question: "",
//         questionImage: "",
//         marks: "",
//         bloomsTaxonomy: "",
//         level: ""
//       });

//     } catch (err) {
//       alert("Server error");
//     }
//   };

//   const ButtonGroup = ({ label, options, field }) => (
//     <div>
//       <p className="text-sm font-semibold mb-2 text-gray-600">{label}</p>
//       <div className="flex gap-2 flex-wrap">
//         {options.map((opt) => (
//           <button
//             key={opt}
//             type="button"
//             onClick={() => handleSelect(field, opt)}
//             className={`px-4 py-1 rounded-full text-sm border transition
//               ${
//                 formData[field] === opt
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//           >
//             {opt}
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Add New Question
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">

//         {/* Row 1 */}
//         <div className="grid grid-cols-2 gap-6">
//           <ButtonGroup label="Unit" options={[1,2,3,4,5]} field="unit" />

//           <div>
//             <p className="text-sm font-semibold mb-2 text-gray-600">CO</p>
//             <div className="px-4 py-2 border rounded bg-gray-100 text-gray-700">
//               {formData.co || "-"}
//             </div>
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="grid grid-cols-2 gap-6">
//           <ButtonGroup label="Type" options={["O", "D"]} field="type" />
//           <ButtonGroup label="Part" options={[1,2]} field="part" />
//         </div>

//         {/* Question Section */}
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <p className="font-semibold mb-2 text-gray-700">Question</p>

//           <textarea
//             name="question"
//             rows="4"
//             placeholder="Type your question here..."
//             value={formData.question}
//             onChange={handleChange}
//             className="w-full border p-3 rounded mb-3"
//           />

//           <input type="file" accept="image/*" onChange={handleImageUpload} />

//           {formData.questionImage && (
//             <img
//               src={formData.questionImage}
//               alt="Preview"
//               className="mt-3 w-48 border rounded"
//             />
//           )}
//         </div>

//         {/* Bottom Row */}
//         <div className="grid grid-cols-3 gap-4">

//           <select name="marks"
//             value={formData.marks}
//             onChange={handleChange}
//             className="border p-2 rounded">
//             <option value="">Marks</option>
//             <option value="2">2</option>
//             <option value="8">8</option>
//           </select>

//           <select name="bloomsTaxonomy"
//             value={formData.bloomsTaxonomy}
//             onChange={handleChange}
//             className="border p-2 rounded">
//             <option value="">Blooms</option>
//             {[1,2,3,4,5,6].map(b => (
//               <option key={b}>{b}</option>
//             ))}
//           </select>

//           <select name="level"
//             value={formData.level}
//             onChange={handleChange}
//             className="border p-2 rounded">
//             <option value="">Level</option>
//             <option value="L">Low</option>
//             <option value="M">Medium</option>
//             <option value="H">High</option>
//           </select>

//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold">
//           Add Question
//         </button>

//       </form>
//     </div>
//   );
// }














// import { useState } from "react";

// export default function AddQuestion() {
//   const [formData, setFormData] = useState({
//     unit: "",
//     co: "",
//     type: "D",
//     part: "",
//     question: "",
//     questionImage: "",
//     marks: "",
//     bloomsTaxonomy: "",
//     level: ""
//   });

//   const handleSelect = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//       ...(field === "unit" && { co: value }) // 🔥 CO = Unit
//     }));
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setFormData((prev) => ({
//         ...prev,
//         questionImage: reader.result
//       }));
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/manual-faculty/add-question", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("manualFacultyToken")}`
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Error adding question");
//         return;
//       }

//       alert("Question added successfully ✅");

//       setFormData({
//         unit: "",
//         co: "",
//         type: "D",
//         part: "",
//         question: "",
//         questionImage: "",
//         marks: "",
//         bloomsTaxonomy: "",
//         level: ""
//       });

//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Add Question</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">

//         {/* 🔥 Unit + CO */}
//         <div className="flex gap-6">
//           <div>
//             <p className="font-medium mb-2">Unit</p>
//             <div className="flex gap-2">
//               {[1,2,3,4,5].map(u => (
//                 <button type="button"
//                   key={u}
//                   onClick={() => handleSelect("unit", u)}
//                   className={`px-3 py-1 rounded ${
//                     formData.unit === u ? "bg-blue-600 text-white" : "bg-gray-200"
//                   }`}>
//                   {u}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <p className="font-medium mb-2">CO</p>
//             <input
//               value={formData.co}
//               disabled
//               className="border p-2 rounded w-20 bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* 🔥 Type + Part */}
//         <div className="flex gap-6">
//           <div>
//             <p className="font-medium mb-2">Type</p>
//             <div className="flex gap-2">
//               {["O","D"].map(t => (
//                 <button type="button"
//                   key={t}
//                   onClick={() => handleSelect("type", t)}
//                   className={`px-3 py-1 rounded ${
//                     formData.type === t ? "bg-blue-600 text-white" : "bg-gray-200"
//                   }`}>
//                   {t}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <p className="font-medium mb-2">Part</p>
//             <div className="flex gap-2">
//               {[1,2].map(p => (
//                 <button type="button"
//                   key={p}
//                   onClick={() => handleSelect("part", p)}
//                   className={`px-3 py-1 rounded ${
//                     formData.part === p ? "bg-blue-600 text-white" : "bg-gray-200"
//                   }`}>
//                   {p}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* 🔥 Question (IMPORTANT UI) */}
//         <div>
//           <p className="font-medium mb-2">Question</p>
//           <textarea
//             name="question"
//             rows="4"
//             placeholder="Enter question text..."
//             value={formData.question}
//             onChange={handleChange}
//             className="w-full border p-3 rounded"
//           />
//         </div>

//         {/* 🔥 Image Upload */}
//         <div>
//           <p className="font-medium mb-2">Upload Image (Optional)</p>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />

//           {formData.questionImage && (
//             <img src={formData.questionImage}
//               alt="Preview"
//               className="w-48 mt-3 border rounded" />
//           )}
//         </div>

//         {/* 🔥 Marks Dropdown */}
//         <select name="marks"
//           value={formData.marks}
//           onChange={handleChange}
//           className="w-full border p-2 rounded">
//           <option value="">Select Marks</option>
//           <option value="2">2</option>
//           <option value="8">8</option>
//         </select>

//         {/* 🔥 Blooms + Level */}
//         <div className="flex gap-6">
//           <select name="bloomsTaxonomy"
//             value={formData.bloomsTaxonomy}
//             onChange={handleChange}
//             className="w-full border p-2 rounded">
//             <option value="">Blooms Taxonomy</option>
//             {[1,2,3,4,5,6].map(b => (
//               <option key={b} value={b}>{b}</option>
//             ))}
//           </select>

//           <select name="level"
//             value={formData.level}
//             onChange={handleChange}
//             className="w-full border p-2 rounded">
//             <option value="">Level</option>
//             <option value="L">Low</option>
//             <option value="M">Medium</option>
//             <option value="H">High</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//           Add Question
//         </button>

//       </form>
//     </div>
//   );
// }









import { useState } from "react";

export default function AddQuestion() {
    const [formData, setFormData] = useState({
        unit: "",
        co: "",
        type: "",
        part: "",
        question: "",
        questionImage: "",
        marks: "",
        bloomsTaxonomy: "",
        level: ""
    });

    // 🔹 Select handler
    const handleSelect = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
            ...(field === "unit" && { co: value })
        }));
    };

    // 🔹 Input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                questionImage: reader.result
            }));
        };
    };

    // 🔹 Validation
    const validateForm = () => {
        const { unit, co, type, part, marks, bloomsTaxonomy, level } = formData;

        if (!unit || !co || !type || !part || !marks || !bloomsTaxonomy || !level) {
            alert("Please fill all required fields ⚠️");
            return false;
        }
        return true;
    };

    // 🔹 Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            // const res = await fetch("http://localhost:5000/api/manual-faculty/add-question", {
            const res = await fetch("https://question-paper-automation.onrender.com/api/manual-faculty/add-question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("manualFacultyToken")}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Error adding question");
                return;
            }

            alert("Question added successfully ✅");

            setFormData({
                unit: "",
                co: "",
                type: "",
                part: "",
                question: "",
                questionImage: "",
                marks: "",
                bloomsTaxonomy: "",
                level: ""
            });

        } catch {
            alert("Server error");
        }
    };

    // 🔹 Reusable Button Group
    const ButtonGroup = ({ label, options, field }) => (
        <div>
            <p className="text-sm font-semibold mb-2 text-gray-600">{label}</p>
            <div className="flex gap-2 flex-wrap">
                {options.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelect(field, opt)}
                        className={`px-4 py-1 rounded-full border text-sm transition ${formData[field] === opt
                                ? "bg-blue-600 text-white border-blue-600 shadow"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            questionImage: ""
        }));

        // reset file input
        const fileInput = document.getElementById("imageInput");
        if (fileInput) fileInput.value = "";
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8">

                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Add Question
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* 🔥 SECTION 1 */}
                    <div className="bg-gray-50 p-5 rounded-xl border">
                        <h3 className="font-semibold mb-4 text-gray-700">
                            Question Configuration
                        </h3>

                        <div className="grid grid-cols-2 gap-6 mb-4">
                            <ButtonGroup label="Unit" options={[1, 2, 3, 4, 5]} field="unit" />

                            <div>
                                <p className="text-sm font-semibold mb-2 text-gray-600">CO</p>
                                <div className="px-4 py-2 border rounded bg-gray-100 font-medium">
                                    {formData.co || "-"}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <ButtonGroup label="Type" options={["O", "D"]} field="type" />
                            <ButtonGroup label="Part" options={[1, 2]} field="part" />
                        </div>
                    </div>

                    {/* 🔥 SECTION 2 */}
                    <div className="bg-gray-50 p-5 rounded-xl border">
                        <h3 className="font-semibold mb-4 text-gray-700">
                            Question Content (Optional)
                        </h3>

                        <textarea
                            name="question"
                            rows="5"
                            placeholder="Enter question text (optional)..."
                            value={formData.question}
                            onChange={handleChange}
                            className="w-full border p-4 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        />

                        <div className="mt-4">
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mb-3"
                            />

                            {formData.questionImage && (
                                <div className="relative w-fit">
                                    <img
                                        src={formData.questionImage}
                                        alt="Preview"
                                        className="w-48 border rounded"
                                    />

                                    {/* ❌ Remove Button */}
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 🔥 SECTION 3 */}
                    <div className="bg-gray-50 p-5 rounded-xl border">
                        <h3 className="font-semibold mb-4 text-gray-700">
                            Evaluation Details
                        </h3>

                        <div className="grid grid-cols-3 gap-4">
                            <select
                                name="marks"
                                value={formData.marks}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            >
                                <option value="">Marks *</option>
                                <option value="2">2</option>
                                <option value="8">8</option>
                            </select>

                            <select
                                name="bloomsTaxonomy"
                                value={formData.bloomsTaxonomy}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            >
                                <option value="">Blooms *</option>
                                {[1, 2, 3, 4, 5, 6].map(b => (
                                    <option key={b}>{b}</option>
                                ))}
                            </select>

                            <select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                className="border p-2 rounded"
                            >
                                <option value="">Level *</option>
                                <option value="L">Low</option>
                                <option value="M">Medium</option>
                                <option value="H">High</option>
                            </select>
                        </div>
                    </div>

                    {/* 🔥 SUBMIT */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition"
                    >
                        Add Question
                    </button>

                </form>
            </div>
        </div>
    );
}