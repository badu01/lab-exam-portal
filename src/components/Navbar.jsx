import { FaUserGraduate } from "react-icons/fa";

const Navbar = ({ setShowResults }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">GEC Exam Platform</h1>

      <button
        className="flex items-center bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700"
        onClick={() => setShowResults(true)}
      >
        <FaUserGraduate className="mr-2" />
        Results
      </button>
    </nav>
  );
};

export default Navbar;
