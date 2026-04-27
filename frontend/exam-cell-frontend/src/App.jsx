// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import UploadQuestionBank from "./pages/UploadQuestionBank";
// import AssignQuestionBank from "./pages/AssignQuestionBank";
// import ViewQuestionBanks from "./pages/ViewQuestionBanks";
// import ProtectedRoute from "./auth/ProtectedRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={
//           <ProtectedRoute><Dashboard /></ProtectedRoute>
//         } />
//         <Route path="/upload" element={
//           <ProtectedRoute><UploadQuestionBank /></ProtectedRoute>
//         } />
//         <Route path="/assign" element={
//           <ProtectedRoute><AssignQuestionBank /></ProtectedRoute>
//         } />
//         <Route path="/question-banks" element={
//           <ProtectedRoute><ViewQuestionBanks /></ProtectedRoute>
//         } />
//       </Routes>
//     </BrowserRouter>
//   );
// }




import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadQuestionBank from "./pages/UploadQuestionBank";
// import AssignQuestionBank from "./pages/AssignQuestionBank";
import ViewQuestionBanks from "./pages/ViewQuestionBanks";
import ProtectedRoute from "./auth/ProtectedRoute";
import GeneratedPapers from "./components/GeneratedPapers";
import ExamCellPaperPreview from "./components/ExamCellPaperPreview";
import CreateFaculty from "./components/CreateFaculty";
import ExternalAccessList from "./pages/ExternalAccessList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        {/* Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* CHILD ROUTES */}
          <Route path="upload" element={<ProtectedRoute><UploadQuestionBank /></ProtectedRoute> } />
          {/* <Route path="assign" element={<AssignQuestionBank />} /> */}
          <Route path="question-banks" element={<ViewQuestionBanks />} />
          <Route path="generated-papers" element={<ProtectedRoute> <GeneratedPapers /> </ProtectedRoute>} />
          {/* <Route path="preview" element={<ProtectedRoute> <ExamCellPaperPreview/> </ProtectedRoute>} /> */}
          <Route path="/dashboard/generated-papers/preview" element={<ExamCellPaperPreview />} />
          <Route path="/dashboard/create-faculty" element={<CreateFaculty />} />
          <Route path="/dashboard/faculty-access-list" element={<ExternalAccessList />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
