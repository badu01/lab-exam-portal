import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";
import FullScreenWrapper from "../components/FullScreenWrapper";

function ExamPage() {
  const [code, setCode] = useState(""); 
  const [language, setLanguage] = useState("python");
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();
  var results

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await axios.get("https://code-editor-backend-production-e36d.up.railway.app/questions");
        const questions = response.data.data;
        const index = Math.floor(Math.random() * questions.length);
        const selectedQuestion = questions[index];

        setQuestion({
          id: selectedQuestion._id,
          title: selectedQuestion.title,
          description: selectedQuestion.description,
          testCases: selectedQuestion.testCases,
        });

        setResult(
          selectedQuestion.testCases.map((testCase) => ({
            input: testCase.input,
            expectedOutput: testCase.output,
            output: "N/A",
            success: null,
          }))
        );
      } catch (err) {
        console.error("Error fetching question:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, []);

  useEffect(() => {
    async function fetchFunctionSignature() {
      if (!question) return;
      try {
        const response = await axios.get(
          `https://code-editor-backend-production-e36d.up.railway.app/questions/${question.id}`
        );
        console.log("ID======"+question.id);
        console.log("lang======"+language);
        console.log("signatureeee======"+response.data);
        
        setCode(response.data.functionSignature);
      } catch (err) {
        console.error("Error fetching function signature:", err);
      }
    }

    fetchFunctionSignature();
  }, [language, question]);

  const handleRun = async () => {
    if (!question) return;
    setIsRunning(true);

    try {
      const data = {
        questionId: question.id,
        language: "python",
        functionCode: code,
        testCases: question.testCases,
      };

      const response = await axios.post(
        "https://code-editor-backend-production-e36d.up.railway.app/execute",
        data
      );
      results = response.data;

      setResult(
        results.map((res) => ({
          input: res.input,
          expectedOutput: res.expectedOutput,
          output: res.actualOutput,
          success: res.status === "success",
        }))
      );
    } catch (error) {
      console.error("Error executing code:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleTimeOut = () => {
    navigate("/exam/finish", {
      state: {
        answers: code,
        testCases: result,
      },
    });
  };

  const handleSubmit = () => {
    navigate("/exam/finish", {
      state: {
        answers: code,
        testCases: result,
      },
    });
  };

  return ( 
    <FullScreenWrapper examData={{ code, results}}>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        {/* Sticky Header */}
        <div className="flex justify-between items-center py-4 px-6 bg-gray-800/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-700">
          <div>
            <h1 className="text-lg font-semibold tracking-wide text-gray-400">CST333</h1>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Python Lab Examination
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Timer hour={0.1} onTimeUp={handleTimeOut} />
            <button 
              onClick={handleSubmit} 
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all rounded-lg text-white font-semibold shadow-lg hover:shadow-red-500/20"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center flex-grow">
            <div className="text-center">
              <div className="inline-flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="text-gray-400 text-lg">Loading question...</p>
              </div>
            </div>
          </div>
        ) : (
          question && (
            <div className="flex flex-col lg:flex-row gap-6 p-6 flex-grow">
              {/* Left Column - Question and Test Cases */}
              <div className="lg:w-1/2 flex flex-col gap-6">
                {/* Question Card */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                  <h1 className="text-2xl font-semibold mb-4">{question.title}</h1>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-line">{question.description}</p>
                  </div>
                </div>

                {/* Test Cases Card */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex-grow">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Test Cases
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-700/50 text-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left">Input</th>
                          <th className="px-4 py-3 text-left">Expected</th>
                          <th className="px-4 py-3 text-left">Output</th>
                          <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {result.map((testCase, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-gray-300 font-mono text-sm">
                              {Array.isArray(testCase.input) ? testCase.input.join(", ") : testCase.input}
                            </td>
                            <td className="px-4 py-3 text-gray-300 font-mono text-sm">
                              {testCase.expectedOutput.toString()}
                            </td>
                            <td className="px-4 py-3 text-gray-300 font-mono text-sm">
                              {testCase.output.toString() || "N/A"}
                            </td>
                            <td className="px-4 py-3">
                              {testCase.success === null ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                                  Pending
                                </span>
                              ) : testCase.success ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                                  Pass
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400">
                                  Fail
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column - Code Editor */}
              <div className="lg:w-1/2 flex flex-col">
                <div className="bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-700 flex-grow flex flex-col">
                 
                  
                  <div className="flex-grow">
                    <CodeEditor
                      value={code}
                      setValue={setCode}
                      language={language}
                      setLanguage={setLanguage}
                    />
                  </div>

                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className={`mt-2 px-5 py-2.5 rounded-lg text-white font-semibold shadow-lg w-full flex items-center justify-center gap-2 ${
                      isRunning
                        ? "bg-blue-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                    }`}
                  >
                    {isRunning ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Running...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Run Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </FullScreenWrapper>
  );
}

export default ExamPage;