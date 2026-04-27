import { useState } from "react";

export default function CreateFaculty() {
    const [credentials, setCredentials] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    department: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/manual-faculty/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("examCellToken")}` // your EXAM_CELL token
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error creating faculty");
      return;
    }

    setCredentials(data.credentials);

    // reset form
    setFormData({
      subject: "",
      name: "",
      department: "",
      email: "",
      phone: ""
    });

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Create Faculty Credential
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Subject */}
        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Faculty Name */}
        <div>
          <label className="block mb-1 font-medium">Faculty Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Faculty
        </button>
      </form>
      {credentials && (
  <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
    <h3 className="text-lg font-semibold mb-2 text-green-700">
      Faculty Created Successfully 🎉
    </h3>

    <p><strong>User ID:</strong> {credentials.userId}</p>
    <p><strong>Password:</strong> {credentials.password}</p>

    <p className="text-sm text-red-500 mt-2">
      ⚠️ Save these credentials. Password will not be shown again.
    </p>
  </div>
)}
    </div>
  );
}