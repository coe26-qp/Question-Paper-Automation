import { Outlet, Link } from "react-router-dom";

export default function FacultyDashboard() {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Faculty Panel</h2>

        <nav className="space-y-3">
          <Link to="/faculty/dashboard" className="block hover:text-blue-300">
            Dashboard
          </Link>

          <Link to="/faculty/dashboard/add-question" className="block hover:text-blue-300">
            Add Question
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}