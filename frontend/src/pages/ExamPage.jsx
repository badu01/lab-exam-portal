import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";
import FullScreenWrapper from "../components/FullScreenWrapper";

function ExamPage() {
  const [code, setCode] = useState(""); 
  const [language, setLanguage] = useState("C");
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
        const response = await axios.get(`http://localhost:5000/questions/${question.id}/${language}`);
        setCode(response.data.functionSignature);
      } catch (err) {
        console.error("Error fetching function signature:", err);
      }
    }

    fetchFunctionSignature();
  }, [language, question]);

  const handleRun = async () => {
    if (!question) return;

    try {
      const data = {
        questionId: question.id,
        language,
        functionCode: code,
        testCases: question.testCases,
      };

      const response = await axios.post("http://localhost:5000/execute", data);
      const { results } = response.data;

      setResult(
        results.map((res) => ({
          input: res.input,
          expectedOutput: res.expectedOutput,
          output: res.actualOutput,
          success: res.passed,
        }))
      );
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  const handleTimeOut = () => {
    navigate("/exam/finish",{
      state: {
        answers: code, // Pass the entered code
        testCases: result, // Pass test case results
      },
    });
  };

  const handleSubmit = ()=>{
    navigate("/exam/finish",{
      state: {
        answers: code, // Pass the entered code
        testCases: result, // Pass test case results
      },
    });
  }

  return (
    <FullScreenWrapper>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col px-6 py-4">
        {/* Sticky Header */}
        <div className="flex justify-between items-center py-4 px-6 bg-gray-800 shadow-lg rounded-xl sticky top-0 z-50">
          <div>
            <h1 className="text-lg font-semibold tracking-wide">CST333</h1>
            <h2 className="text-2xl font-bold">Python Lab Examination</h2>
          </div>
          <div className="flex items-center gap-4">
            <Timer hour={0.01} onTimeUp={handleTimeOut} />
            <button onClick={handleSubmit} className="px-5 py-2 bg-red-600 hover:bg-red-700 transition-all rounded-lg text-white font-semibold">
              Submit
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center flex-grow">
            <p className="text-gray-400 text-lg">Loading question...</p>
          </div>
        ) : (
          question && (
            <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-4">
              {/* Question Details */}
              <h1 className="text-3xl font-semibold">{question.title}</h1>
              <p className="text-lg text-gray-300">{question.description}</p>

              {/* Test Case Results Table */}
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Test Cases</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-700">
                    <thead className="bg-gray-700 text-gray-200">
                      <tr>
                        <th className="px-4 py-3 border border-gray-600">Input</th>
                        <th className="px-4 py-3 border border-gray-600">Expected Output</th>
                        <th className="px-4 py-3 border border-gray-600">Actual Output</th>
                        <th className="px-4 py-3 border border-gray-600">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.map((testCase, index) => (
                        <tr key={index} className="border border-gray-600">
                          <td className="px-4 py-2 text-gray-300">
                            {Array.isArray(testCase.input) ? testCase.input.join(", ") : testCase.input}
                          </td>
                          <td className="px-4 py-2 text-gray-300">{testCase.expectedOutput.toString()}</td>
                          <td className="px-4 py-2 text-gray-300">{testCase.output || "N/A"}</td>
                          <td className="px-4 py-2">
                            {testCase.success === null ? (
                              <span className="text-gray-500">Pending</span>
                            ) : testCase.success ? (
                              <span className="text-green-400 font-bold">Pass</span>
                            ) : (
                              <span className="text-red-500 font-bold">Fail</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Code Editor */}
              <div className="mt-4 bg-gray-900 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-3">Write Your Code</h2>
                <CodeEditor
                  value={code}
                  setValue={setCode}
                  language={language}
                  setLanguage={setLanguage}
                  // onRun={handleRun}
                />
                <button
                  className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-semibold w-full"
                  onClick={handleRun}
                >
                  Run Code
                </button>
              </div>
            </div>
          )
        )}

        <div className="h-14"></div>
      </div>
    </FullScreenWrapper>
  );
}

export default ExamPage;
