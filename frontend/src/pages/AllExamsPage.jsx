import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { exams } from "../utils/examData";
import ExamCard from "../components/ExamCard";
import Navbar from "../components/Navbar";

const AllExamsPage = () => {
  const { user } = useAuth();
  const [previousExams, setPreviousExams] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Simulated API Call - Replace with actual API request
    const fetchResults = async () => {
      const response = await fetch(`https://your-api.com/results?reg=${user.registerNumber}`);
      const data = await response.json();
      setPreviousExams(data);
    };

    if (user) fetchResults();
  }, [user]);

  if (!user) {
    return <p className="text-center text-lg text-red-500">Not logged in</p>;
  }

  // Split upcoming and available exams
  const upcomingExams = exams.filter((exam) => exam.upcoming);
  const availableExams = exams.filter((exam) => !exam.upcoming);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar setShowResults={setShowResults} /> {/* Navbar only for this page */}

      <div className="p-8">
        {/* Student Info */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-lg text-gray-300">Register Number: {user.registerNumber}</p>
        </div>

        {/* Available Exams */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Available Exams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {availableExams.length > 0 ? (
              availableExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
            ) : (
              <p className="text-gray-400">No exams available.</p>
            )}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div>
          <h2 className="text-2xl font-semibold">Upcoming Exams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {upcomingExams.length > 0 ? (
              upcomingExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
            ) : (
              <p className="text-gray-400">No upcoming exams.</p>
            )}
          </div>
        </div>
      </div>

      {/* Results Pop-up */}
      {showResults && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Previous Exam Results</h2>

            {previousExams.length > 0 ? (
              <ul className="space-y-2">
                {previousExams.map((exam) => (
                  <li key={exam.id} className="flex justify-between p-3 bg-gray-200 rounded">
                    <span>{exam.name}</span>
                    <span className="font-bold">{exam.score} / 100</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No previous exams found.</p>
            )}

            {/* Close Button */}
            <button
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 w-full"
              onClick={() => setShowResults(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllExamsPage;
