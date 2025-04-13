import { useNavigate } from "react-router-dom";

const ExamCard = ({ exam, isUpcoming = false }) => {
  const navigate = useNavigate();
  return (
    <div className={`bg-gray-800 rounded-xl overflow-hidden border ${
      isUpcoming ? 'border-purple-500/30' : 'border-blue-500/30'
    } hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]`}>
      <div className={`p-5 ${
        isUpcoming ? 'bg-purple-900/20' : 'bg-blue-900/20'
      }`}>
        <h3 className="text-lg font-semibold">{exam.name}</h3>
        <p className="text-sm text-gray-400">{exam.subject}</p>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-400">Date:</span>
          <span>{exam.date}</span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-400">Duration:</span>
          <span>{exam.duration} mins</span>
        </div>
        
        {isUpcoming ? (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-400">
              Coming Soon
            </span>
          </div>
        ) : (
          <button className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition"
          onClick={() => navigate(`/rules/${exam.id}`)}>
            Start Exam
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamCard;
