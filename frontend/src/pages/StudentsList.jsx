import { useState, useRef } from "react";
import studentsData from "../utils/students";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

export default function StudentList() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("rollNumber");
  const [sortAsc, setSortAsc] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const tableRef = useRef(null);

  const filteredStudents = studentsData
    .filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.registerNumber.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const compareValue = a[sortField].localeCompare(b[sortField]);
      return sortAsc ? compareValue : -compareValue;
    });

  const exportCSV = () => {
    setIsExporting(true);
    try {
      const header = ["Name,Register No,Roll No,DOB"];
      const rows = filteredStudents.map((s) =>
        [s.name, s.registerNumber, s.rollNumber, s.dob].join(",")
      );
      const csvContent = [header, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "students.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.text("Student List", 14, 22);
      
      // Date
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Table data
      const headers = [["Name", "Register No", "Roll No", "Date of Birth"]];
      const data = filteredStudents.map(student => [
        student.name,
        student.registerNumber,
        student.rollNumber,
        student.dob
      ]);
      
      // Use autoTable directly (not as doc method)
      autoTable(doc, {
        head: headers,
        body: data,
        startY: 40,
        theme: 'grid',
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        margin: { top: 40 },
        styles: {
          cellPadding: 3,
          fontSize: 10,
          valign: 'middle'
        },
        columnStyles: {
          0: { cellWidth: 'auto' },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' }
        }
      });
      
      doc.save("students.pdf");
    } catch (error) {
      console.error("PDF export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getSortIndicator = (field) => {
    if (field !== sortField) return null;
    return sortAsc ? "↑" : "↓";
  };

  return (
    <div className="space-y-6 bg-gray-950 w-screen h-full mx-auto px-6">
      <button
        onClick={() => setShow(!show)}
        className={`flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg ${
          show ? "ring-2 ring-blue-400" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
        {show ? "Hide Student List" : "View Student List"}
      </button>

      {show && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700 shadow-sm">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search students by name or register number..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 bg-gray-700 rounded-lg border border-gray-600 p-1">
                <span className="text-xs text-gray-400 px-2">Sort by:</span>
                <button
                  onClick={() => handleSort("name")}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    sortField === "name"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Name {getSortIndicator("name")}
                </button>
                <button
                  onClick={() => handleSort("registerNumber")}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    sortField === "registerNumber"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Reg No {getSortIndicator("registerNumber")}
                </button>
                <button
                  onClick={() => handleSort("rollNumber")}
                  className={`px-3 py-1.5 text-sm rounded-md transition ${
                    sortField === "rollNumber"
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Roll No {getSortIndicator("rollNumber")}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={exportCSV}
                  disabled={isExporting || filteredStudents.length === 0}
                  className={`flex items-center gap-2 ${
                    filteredStudents.length === 0 || isExporting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white px-4 py-2.5 rounded-lg transition-all duration-200 shadow-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  CSV
                </button>

                <button
                  onClick={exportPDF}
                  disabled={isExporting || filteredStudents.length === 0}
                  className={`flex items-center gap-2 ${
                    filteredStudents.length === 0 || isExporting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white px-4 py-2.5 rounded-lg transition-all duration-200 shadow-sm`}
                >
                  {isExporting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a1 1 0 011-1h8a1 1 0 011 1v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h1V4zm2 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl shadow-lg border border-gray-700 bg-gray-900" ref={tableRef}>
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Name
                      <span className="ml-1">
                        {getSortIndicator("name")}
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => handleSort("registerNumber")}
                  >
                    <div className="flex items-center">
                      Register No
                      <span className="ml-1">
                        {getSortIndicator("registerNumber")}
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => handleSort("rollNumber")}
                  >
                    <div className="flex items-center">
                      Roll No
                      <span className="ml-1">
                        {getSortIndicator("rollNumber")}
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Date of Birth
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {filteredStudents.map((student, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-800/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                          <span className="text-blue-400 font-medium">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {student.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300 font-mono">
                        {student.registerNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900/30 text-blue-400">
                        {student.rollNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {student.dob}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12 bg-gray-900/50">
                <svg
                  className="mx-auto h-12 w-12 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-300">
                  No students found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {search.trim() === ""
                    ? "The student list is currently empty."
                    : "No students match your search criteria."}
                </p>
              </div>
            )}
          </div>

          {filteredStudents.length > 0 && (
            <div className="text-sm text-gray-500 text-right">
              Showing <span className="font-medium">{filteredStudents.length}</span>{" "}
              {filteredStudents.length === 1 ? "student" : "students"}
              {search.trim() !== "" && (
                <span className="ml-2">
                  (searched from {studentsData.length} total)
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}