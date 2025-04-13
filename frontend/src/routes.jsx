import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import AllExamsPage from "./pages/AllExamsPage";
import ExamRulesPage from "./pages/ExamRulesPage";
import ExamPage from "./pages/ExamPage";
import NotFound from "./pages/NotFound";
import FinishExam from "./pages/FinishExam";
import AdminInterface from "./pages/AdminInterface";
import StudentList from "./pages/StudentsList";

function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminInterface />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/exams" element={<AllExamsPage />} />
          <Route path="/exam/finish" element={<FinishExam />} />
          <Route path="/rules/:examId" element={<ExamRulesPage />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;
