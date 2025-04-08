import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FinishExam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get submitted data
  const { answers, testCases } = location.state || {
    answers: "",
    testCases: [],
  };

  // Calculate score
  const totalTestCases = testCases.length;
  const passedTestCases = testCases.filter((test) => test.success).length;
  const score = totalTestCases > 0 ? Math.round((passedTestCases / totalTestCases) * 100) : 0;

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header Section */}
      <div className="bg-gray-950 px-8 py-6 rounded-xl mb-5 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-semibold text-blue-400">Exam Completed</h1>
          <p className="text-gray-300 mt-1">Here are your final results</p>
        </div>
        <div className="text-right">
          <h1 className="text-lg text-green-400 font-medium">Score</h1>
          <h1 className="text-4xl font-bold">{score}/100</h1>
        </div>
      </div>

      {/* Student's Answer */}
      <div className="bg-gray-950 px-8 py-6 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold text-yellow-400">Your Answer</h2>
        <pre className="mt-3 p-4 bg-gray-800 rounded-lg whitespace-pre-wrap">
          {answers || "No answer submitted"}
        </pre>
      </div>

      {/* Test Case Results Table */}
      <div className="bg-gray-950 px-8 py-6 rounded-xl">
        <h2 className="text-2xl font-semibold text-green-400 mb-4">Test Case Results</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-3 border border-gray-700">Input</th>
                <th className="px-4 py-3 border border-gray-700">Expected Output</th>
                <th className="px-4 py-3 border border-gray-700">Actual Output</th>
                <th className="px-4 py-3 border border-gray-700">Result</th>
              </tr>
            </thead>
            <tbody>
              {testCases.length > 0 ? (
                testCases.map((test, index) => (
                  <tr key={index} className="border border-gray-700">
                    <td className="px-4 py-3 text-gray-300">{test.input}</td>
                    <td className="px-4 py-3 text-gray-300">{test.expectedOutput}</td>
                    <td className="px-4 py-3 text-gray-300">{test.output}</td>
                    <td className="px-4 py-3 font-bold text-center" 
                      style={{ backgroundColor: test.success ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)" }}>
                      {test.success ? <span className="text-green-400">✅ Pass</span> : <span className="text-red-400">❌ Fail</span>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-gray-400">
                    No test cases available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Finish Exam Button */}
      <div className="flex justify-center mt-10">
        <button
          className="px-8 py-3 w-full bg-green-600 hover:bg-green-800 transition-all text-white text-lg font-medium rounded-lg shadow-md"
          onClick={() => navigate("/")}
        >
          Finish & Logout
        </button>
      </div>
    </div>
  );
};

export default FinishExam;
