import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import students from "../utils/students.js"; // ✅ Import student list

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock exam database
let exams = [
  { id: "exam1", name: "Math Exam", date: "2025-04-10" },
  { id: "exam2", name: "Science Quiz", date: "2025-04-20" },
];

// 🔐 **Authenticate student (Login)**
app.post("/login", (req, res) => {
  const { registerNumber, dob } = req.body;

  if (!registerNumber || !dob) {
    return res.status(400).json({ success: false, message: "Register number and DOB are required." });
  }

  // Convert input to string (handling cases where register number is numeric)
  const regNumStr = registerNumber.toString();

  // Check if the student exists in the imported list
  const student = students.find((s) => s.registerNumber === regNumStr && s.dob === dob);

  if (student) {
    return res.json({ success: true, student });
  }

  return res.status(401).json({ success: false, message: "Invalid register number or DOB." });
});

// 📚 **Get all exams & student scores**
app.get("/exams/:registerNumber", (req, res) => {
  const { registerNumber } = req.params;

  const student = students.find((s) => s.registerNumber === registerNumber);
  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }

  res.json({
    upcomingExams: exams.filter((e) => new Date(e.date) > new Date()),
    scores: student.scores || [],
  });
});

// 📝 **Submit exam results**
app.post("/submit-exam", (req, res) => {
  const { registerNumber, examId, score } = req.body;

  const student = students.find((s) => s.registerNumber === registerNumber);
  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }

  // Append the new score to student's records
  student.scores = student.scores || [];
  student.scores.push({ examId, score });

  res.json({ success: true, message: "Score saved successfully." });
});

// 🚀 **Start Server**
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
