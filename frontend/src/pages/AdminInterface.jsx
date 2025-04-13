import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddChallenge() {
  const navigate = useNavigate();
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

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

  const createChallenge = async (question) => {
    try {
      const response = await axios.post(
        "https://code-editor-backend-production-e36d.up.railway.app/questions",
        question
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error inside AddChallenge component", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const title = fd.get("title");
    const description = fd.get("description");

    const functionSignatures = {
      C: fd.get("C"),
      Java: fd.get("Java"),
      Python: fd.get("Python"),
    };

    const formattedTestCases = testCases.map((tc) => ({
      input: JSON.parse(tc.input),
      output: JSON.parse(tc.output),
    }));

    createChallenge({
      title,
      description,
      testCases: formattedTestCases,
      functionSignatures,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-950 shadow-xl rounded-xl p-8 space-y-6 border border-gray-700"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-center mb-6">
            {" "}
            Add New Challenge
          </h2>
          <button
            type="button"
            onClick={() => navigate("/students")}
            className=" p-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            Show Students List
          </button>
        </div>
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        <div className="space-y-4 bg-gray-900 p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Test Cases</h3>
            <button
              type="button"
              onClick={handleAddTestCase}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              + Add
            </button>
          </div>

          {testCases.map((testCase, index) => (
            <div key={index} className="flex gap-4 items-center">
              <input
                type="text"
                name="input"
                placeholder="e.g. [1,2]"
                value={testCase.input}
                onChange={(e) =>
                  handleInputChange(index, "input", e.target.value)
                }
                className="w-1/2 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="output"
                placeholder="e.g. 3"
                value={testCase.output}
                onChange={(e) =>
                  handleInputChange(index, "output", e.target.value)
                }
                className="w-1/2 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveTestCase(index)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4 bg-gray-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Function Signatures</h3>
          {["C", "Java", "Python"].map((lang) => (
            <div key={lang}>
              <label htmlFor={lang} className="block text-lg font-medium mb-1">
                {lang}
              </label>
              <textarea
                name={lang}
                id={lang}
                rows="2"
                placeholder={`Enter function signature for ${lang}`}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mt-6 shadow-md transition duration-200"
        >
          Submit Challenge
        </button>
      </form>
    </div>
  );
}
