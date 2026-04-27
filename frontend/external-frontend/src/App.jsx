import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExternalLogin from "./pages/ExternalLogin";
import ExternalDashboard from "./pages/ExternalDashboard";
import ExternalProtectedRoute from "./auth/ExternalProtectedRoute";
import ExternalQuestionBank from "./pages/ExternalQuestionBank";
import GeneratedQuestionPaperPreview from "./pages/GeneratedQuestionPaperPreview";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacultyDashboard from "./pages/FacultyDashboard";
import AddQuestion from "./pages/AddQuestion";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExternalLogin />} />

        <Route
          path="/dashboard"
          element={
            <ExternalProtectedRoute>
              <ExternalDashboard />
            </ExternalProtectedRoute>
          }
        />
        {/* <Route path="/external/questions" element={ <ExternalQuestionBank />} /> */}
        <Route
          path="/external/questions/:questionBankId"
          element={
            <ExternalProtectedRoute>
              <ExternalQuestionBank />
            </ExternalProtectedRoute>
          }
        />

        <Route 
          path="/external/paper-preview"
          element={
            <ExternalProtectedRoute>
              <GeneratedQuestionPaperPreview />
            </ExternalProtectedRoute>
          } 

          />

          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/dashboard/add-question" element={<AddQuestion />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} />
    </BrowserRouter>
  );
}
