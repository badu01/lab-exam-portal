import { Editor } from "@monaco-editor/react";

function CodeEditor({ value, setValue, language }) {
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    fontFamily: "'Fira Code', monospace",
    fontLigatures: true,
    lineNumbers: "on",
    renderWhitespace: "selection",
    scrollbar: {
      vertical: "auto",
      horizontal: "auto",
    },
    wordWrap: "on",
  };

  // const languageOptions = [
  //   { value: "python", label: "Python" },
  //   { value: "java", label: "Java" },
  //   { value: "c", label: "C" },
  //   { value: "javascript", label: "JavaScript" },
  //   { value: "typescript", label: "TypeScript" },
  //   { value: "cpp", label: "C++" },
  // ];

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shadow-lg">
      {/* Editor Header */}
      <div className="flex justify-between items-center bg-gray-900 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <h2 className="text-lg font-semibold text-white">Code Editor</h2>
        </div>

        <span>{language}</span>
        {/* Language Selector */}
        {/* <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-gray-800 border border-gray-700 text-white text-sm rounded-md pl-3 pr-8 py-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div> */}
      </div>

      {/* Monaco Editor */}
      <div className="flex-grow">
        <Editor
          theme="vs-dark"
          language={language.toLowerCase()}
          value={value}
          onChange={(value) => setValue(value)}
          options={editorOptions}
          loading={
            <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
              Loading editor...
            </div>
          }
        />
      </div>

      {/* Editor Footer */}
      <div className="bg-gray-900 px-4 py-2 border-t border-gray-700 flex justify-between items-center text-xs text-gray-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            {language}
          </span>
          <span>UTF-8</span>
        </div>
        <div>
          <span>Ln 1, Col 1</span>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
