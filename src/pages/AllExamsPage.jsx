import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { exams } from "../utils/examData";
import ExamCard from "../components/ExamCard";
import Navbar from "../components/Navbar";

const AllExamsPage = () => {
  const { user } = useAuth();
  const [previousExams, setPreviousExams] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoadingResults(true);
      try {
        // Simulated API Call - Replace with actual API request
        const response = await fetch(
          `https://your-api.com/results?reg=${user.registerNumber}`
        );
        const data = await response.json();
        setPreviousExams(data);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      } finally {
        setIsLoadingResults(false);
      }
    };

    if (user) fetchResults();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-center text-lg text-red-500 p-6 bg-gray-800 rounded-lg">
          Please login to access this page
        </p>
      </div>
    );
  }

  // Split upcoming and available exams
  const upcomingExams = exams.filter((exam) => exam.upcoming);
  const availableExams = exams.filter((exam) => !exam.upcoming);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar setShowResults={setShowResults} />

      <div className="container mx-auto px-4 py-8">
        {/* Student Info Card */}
        <div className="bg-gradient-to-r from-blue-900/50 to-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600/20 p-3 rounded-full border border-blue-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
              <p className="text-gray-300 font-mono tracking-wide">
                {user.registerNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Available Exams Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Available Exams
            </h2>
            <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
              {availableExams.length} exams
            </span>
          </div>

          {availableExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/30 p-8 rounded-xl border border-dashed border-gray-700 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-400">No exams available at the moment</p>
              <p className="text-sm text-gray-500 mt-1">
                Check back later for new exams
              </p>
            </div>
          )}
        </section>

        {/* Upcoming Exams Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Upcoming Exams
            </h2>
            <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
              {upcomingExams.length} exams
            </span>
          </div>

          {upcomingExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} isUpcoming={true} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/30 p-8 rounded-xl border border-dashed border-gray-700 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-500 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-400">No upcoming exams scheduled</p>
              <p className="text-sm text-gray-500 mt-1">
                New exams will appear here when scheduled
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-md overflow-hidden animate-modal-enter">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Exam Results</h2>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Your previous exam scores
              </p>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {isLoadingResults ? (
                <div className="p-8 flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-400">Loading your results...</p>
                </div>
              ) : previousExams.length > 0 ? (
                <ul className="divide-y divide-gray-700">
                  {previousExams.map((exam) => (
                    <li
                      key={exam.id}
                      className="p-4 hover:bg-gray-700/50 transition"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{exam.name}</h3>
                          <p className="text-sm text-gray-400">
                            {exam.date || "Completed"}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            exam.score >= 70
                              ? "bg-green-900/30 text-green-400"
                              : exam.score >= 50
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {exam.score}%
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-500 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-400">No exam results found</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Complete exams to see your results here
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-700 bg-gray-800/50">
              <button
                onClick={() => setShowResults(false)}
                className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-modal-enter {
          animation: modalEnter 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AllExamsPage;