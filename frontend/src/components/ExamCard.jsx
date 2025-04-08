import { useNavigate } from "react-router-dom";

const ExamCard = ({ exam }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-lg bg-gray-800 text-white cursor-pointer"
         onClick={() => navigate(`/rules/${exam.id}`)}>
      <h2 className="text-lg font-bold">{exam.name}</h2>
      <p>{exam.description}</p>
    </div>
  );
};

export default ExamCard;
