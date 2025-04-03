import { useParams, useNavigate } from "react-router-dom";
import RuleModal from "../components/RuleModal";

const ExamRulesPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <RuleModal onContinue={() => navigate(`/exam/${examId}`)} />
    </div>
  );
};

export default ExamRulesPage;
