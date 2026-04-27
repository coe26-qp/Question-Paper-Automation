// import { Outlet, Link, useNavigate } from "react-router-dom";

// export default function Dashboard() {

//   const navigate = useNavigate();
//   return (
//     <div className="flex min-h-screen">

//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col h-screen">
//         <h2 className="text-xl font-bold mb-6">Exam Cell</h2>

//         {/* Navigation */}
//         <nav className="space-y-3 flex-1">
//           <Link
//             to="/dashboard"
//             className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-blue-500 transition"
//           >
//             Dashboard
//           </Link>

//           <Link
//             to="/dashboard/upload"
//             className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-blue-500 transition"
//           >
//             Upload Question Bank
//           </Link>

//           <Link
//             to="/dashboard/question-banks"
//             className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-blue-500 transition"
//           >
//             View Question Banks
//           </Link>

//           <Link
//             to="/dashboard/generated-papers"
//             className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-blue-500 transition"
//           >
//             Generated Question Papers
//           </Link>

//           <Link
//             to="/dashboard/create-faculty"
//             className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-blue-500 transition"
//           >
//             Create Faculty Credential
//           </Link>

//           <Link
//             to="/dashboard/faculty-access-list"
//             className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-blue-500 transition"
//           >
//             Faculty Credential List
//           </Link>
//         </nav>

//         {/* Bottom Login Button */}
//         <button onClick={()=> navigate("http://localhost:5174")} className="mt-auto w-full px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition">
//           Login
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// }



import { Outlet, Link, useNavigate } from "react-router-dom";
export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden"> {/* ✅ IMPORTANT */}

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Exam Cell</h2>

        <nav className="space-y-3 flex-1">
          <Link to="/dashboard" className="block px-4 py-2 bg-gray-700 rounded hover:bg-blue-500">Dashboard</Link>
          <Link to="/dashboard/upload" className="block px-4 py-2 bg-gray-700 rounded hover:bg-blue-500">Upload Question Bank</Link>
          <Link to="/dashboard/question-banks" className="block px-4 py-2 bg-gray-700 rounded hover:bg-blue-500">View Question Banks</Link>
          <Link to="/dashboard/generated-papers" className="block px-4 py-2 bg-gray-700 rounded hover:bg-blue-500">Generated Papers</Link>
          <Link to="/dashboard/create-faculty" className="block px-4 py-2 bg-gray-700 rounded hover:bg-blue-500">Create Faculty</Link>
          <Link to="/dashboard/faculty-access-list" className="block px-4 py-2 bg-gray-700 rounded hover:bg-blue-500">Faculty List</Link>
        </nav>

        <button
          onClick={() => navigate("http://localhost:5174")}
          className="mt-auto w-full px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Login
        </button>
      </aside>

      {/* ✅ SCROLL ONLY HERE */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <Outlet />
      </main>

    </div>
  );
}
