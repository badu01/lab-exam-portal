import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FinishExam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get submitted data
  const { answers, testCases, terminated } = location.state || {
    answers: "",
    testCases: [],
    terminated: false
  };

  // Calculate score
  const totalTestCases = testCases.length;
  const passedTestCases = testCases.filter((test) => test.success).length;
  const score = totalTestCases > 0 ? Math.round((passedTestCases / totalTestCases) * 100) : 0;

  useEffect(() => {
    // Prevent back navigation
    const handleBackButton = (e) => {
      e.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener('popstate', handleBackButton);
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-850 px-6 py-8 rounded-xl shadow-lg border border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {terminated ? "Exam Terminated" : "Exam Completed"}
              </h1>
              <p className="text-gray-400 mt-2">
                {terminated 
                  ? "Your exam was terminated due to rule violations"
                  : "Your submission has been successfully recorded"}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-gray-800/50 px-6 py-4 rounded-lg border border-gray-700 text-center">
                <p className="text-sm text-gray-400">Final Score</p>
                <div className="flex items-end justify-center gap-1 mt-1">
                  <span className="text-4xl font-bold text-white">{score}</span>
                  <span className="text-gray-400 mb-1">/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Submission */}
          <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Your Solution
              </h2>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                {testCases.length} Test Cases
              </span>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-x-auto">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                {answers || "No code submitted"}
              </pre>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Test Case Results
            </h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {testCases.length > 0 ? (
                testCases.map((test, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${test.success ? 'border-green-900/50 bg-green-900/10' : 'border-red-900/50 bg-red-900/10'}`}
                  >
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">Input</p>
                        <p className="font-mono text-white">{test.input}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Expected</p>
                        <p className="font-mono text-white">{test.expectedOutput}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Output</p>
                        <p className="font-mono text-white">{test.output || "N/A"}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        test.success 
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {test.success ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2">No test cases available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary & Actions */}
        <div className="mt-8 bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white">Test Case Summary</h3>
                <p className="text-sm text-gray-400">
                  {passedTestCases} passed • {totalTestCases - passedTestCases} failed • {totalTestCases} total
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-lg transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Finish and Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishExam;