/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import students from "../utils/students"; // Import the hardcoded students list

export default function AddChallenge() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  
  // Basic exam information
  const [examInfo, setExamInfo] = useState({
    title: "",
    courseCode: "",
    examDate: "",
    startTime: "",
    duration: 60,
    description: ""
  });

  // Function signatures
  const [functionSignatures, setFunctionSignatures] = useState({
    C: "",
    Java: "",
    Python: ""
  });

  // Set up student selection when reaching step 3
  useEffect(() => {
    if (currentStep === 3) {
      // No need to fetch data since we're using hardcoded students
      if (selectAll) {
        setSelectedStudents(students.map(student => student.registerNumber));
      }
    }
  }, [currentStep, selectAll]);

  const handleAddTestCase = () => {
    setTestCases((prev) => [...prev, { input: "", output: "" }]);
  };

  const handleRemoveTestCase = (index) => {
    setTestCases((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  const handleExamInfoChange = (field, value) => {
    setExamInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFunctionSignatureChange = (language, value) => {
    setFunctionSignatures(prev => ({
      ...prev,
      [language]: value
    }));
  };

  const handleSelectAllStudents = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedStudents(students.map(student => student.registerNumber));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (registerNumber) => {
    if (selectedStudents.includes(registerNumber)) {
      setSelectedStudents(prev => prev.filter(id => id !== registerNumber));
    } else {
      setSelectedStudents(prev => [...prev, registerNumber]);
    }
  };

  const createChallenge = async () => {
    try {
      setLoading(true);
      
      const formattedTestCases = testCases.map((tc) => {
        try {
          return {
            input: JSON.parse(tc.input),
            output: JSON.parse(tc.output),
          };
        } catch (e) {
          // Fallback for non-JSON inputs
          return {
            input: tc.input,
            output: tc.output,
          };
        }
      });

      const challengeData = {
        ...examInfo,
        testCases: formattedTestCases,
        functionSignatures,
        assignedStudents: selectedStudents
      };

      const response = await axios.post(
        "https://code-editor-backend-production-e36d.up.railway.app/questions",
        challengeData
      );
      
      console.log("Challenge created:", response.data);
      setLoading(false);
      
      // Navigate to success page or dashboard
      navigate("/success", { state: { message: "Challenge created successfully!" } });
    } catch (err) {
      console.error("Error creating challenge", err);
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(current => current + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(current => current - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createChallenge();
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8 space-x-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`relative flex flex-col items-center ${currentStep >= step ? 'text-blue-400' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all
                ${currentStep === step ? 'bg-blue-600 ring-4 ring-blue-400/30' : 'bg-gray-800'} 
                ${currentStep > step ? 'bg-green-500' : ''}`}>
                {currentStep > step ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="font-medium">{step}</span>
                )}
              </div>
              <span className="text-xs font-medium mt-1">
                {['Basic Info', 'Challenge Details', 'Assign Students'][step - 1]}
              </span>
            </div>
            {step < 3 && (
              <div className="w-16 h-1 mx-2 bg-gray-700 rounded-full">
                <div className={`h-full rounded-full transition-all duration-500 ${currentStep > step ? 'bg-green-500' : 'bg-gray-700'}`} 
                     style={{ width: `${currentStep > step ? '100%' : '0%'}` }} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Updated renderStep1 with improved styling
  const renderStep1 = () => (
    <div className="space-y-6">
        <h3 className="text-xl font-semibold text-blue-400">Basic Exam Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-300">
              Exam Title
            </label>
            <input 
              type="text" 
              id="title" 
              value={examInfo.title}
              onChange={(e) => handleExamInfoChange('title', e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Data Structures Final Exam"
            />
          </div>
          
          <div>
            <label htmlFor="courseCode" className="block text-sm font-medium mb-1 text-gray-300">
              Course Code
            </label>
            <input 
              type="text" 
              id="courseCode" 
              value={examInfo.courseCode}
              onChange={(e) => handleExamInfoChange('courseCode', e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. CS101"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="examDate" className="block text-sm font-medium mb-1 text-gray-300">
              Exam Date
            </label>
            <input 
              type="date" 
              id="examDate" 
              value={examInfo.examDate}
              onChange={(e) => handleExamInfoChange('examDate', e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium mb-1 text-gray-300">
              Start Time
            </label>
            <input 
              type="time" 
              id="startTime" 
              value={examInfo.startTime}
              onChange={(e) => handleExamInfoChange('startTime', e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-1 text-gray-300">
              Duration (minutes)
            </label>
            <input 
              type="number" 
              id="duration" 
              value={examInfo.duration}
              onChange={(e) => handleExamInfoChange('duration', parseInt(e.target.value))}
              required
              min="5"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-gray-300">
            Exam Description / Instructions
          </label>
          <textarea 
            id="description" 
            value={examInfo.description}
            onChange={(e) => handleExamInfoChange('description', e.target.value)}
            rows="4"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Provide instructions or general description about this exam"
          ></textarea>
        </div>
      </div>
  );

  // Enhanced test cases table
  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-blue-400">Test Cases</h3>
          <button
            onClick={handleAddTestCase}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Test Case
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">#</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Input</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Expected Output</th>
                <th className="px-4 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {testCases.map((testCase, index) => (
                <tr key={index} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                  <td className="px-4 py-3">
                    <input
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="[1,2,3]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="6"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleRemoveTestCase(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">Function Signatures</h3>
        <div className="space-y-6">
          {["Python", "Java", "C"].map((lang) => (
            <div key={lang} className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">{lang}</label>
              <div className="relative">
                <textarea
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder={`def solution(...):`}
                />
                <div className="absolute right-3 top-3 text-xs text-gray-500">{lang}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Enhanced student selection
  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-blue-400">Assign Students</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {selectedStudents.length} selected
            </span>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllStudents}
                className="h-4 w-4 text-blue-600 border-gray-500 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-300">Select All</label>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-gray-700">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-900 sticky top-0">
                <tr>
                  <th className="w-12 px-4 py-3"></th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Register No.</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">DOB</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {students.map((student) => (
                  <tr 
                    key={student.registerNumber}
                    className={`hover:bg-gray-900/30 ${selectedStudents.includes(student.registerNumber) ? 'bg-blue-900/20' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.registerNumber)}
                        onChange={() => handleSelectStudent(student.registerNumber)}
                        className="h-4 w-4 text-blue-600 border-gray-500 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                          <span className="text-blue-400 text-sm">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-white">{student.name}</div>
                          <div className="text-sm text-gray-400">{student.rollNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{student.registerNumber}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {new Date(student.dob).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">Review Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Exam Title</label>
            <div className="text-white font-medium">{examInfo.title}</div>
          </div>
          {/* Other summary fields */}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Create New Challenge
          </h1>
          <button
            onClick={() => navigate("/students")}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            View Students
          </button>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl p-8">
          {renderStepIndicator()}
          
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between mt-10">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
                >
                  Continue
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`ml-auto flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 rounded-lg transition-all ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Create Challenge
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}