import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


const app = express();
app.use(cors());
app.use(bodyParser.json());


let students = {
  "1234567890": { name: "John Doe", dob: "2005-08-15", scores: [] },
  "0987654321": { name: "Jane Smith", dob: "2006-05-10", scores: [] },
};

let exams = [
  { id: "exam1", name: "Math Exam", date: "2025-04-10" },
  { id: "exam2", name: "Science Quiz", date: "2025-04-20" },
];

// Authenticate student
app.post("/login", (req, res) => {
  const { registerNumber, dob } = req.body;
  if (students[registerNumber] && students[registerNumber].dob === dob) {
    res.json({ success: true, student: { registerNumber, ...students[registerNumber] } });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Get all exams & student scores
app.get("/exams/:registerNumber", (req, res) => {
  const { registerNumber } = req.params;
  if (!students[registerNumber]) return res.status(404).json({ message: "Student not found" });

  res.json({
    upcomingExams: exams.filter((e) => new Date(e.date) > new Date()),
    scores: students[registerNumber].scores,
  });
});

// Submit exam results
app.post("/submit-exam", (req, res) => {
  const { registerNumber, examId, score } = req.body;
  if (!students[registerNumber]) return res.status(404).json({ message: "Student not found" });

  students[registerNumber].scores.push({ examId, score });
  res.json({ success: true, message: "Score saved successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
