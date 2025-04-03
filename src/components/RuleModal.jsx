const RuleModal = ({ onContinue }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 px-4">
      <div className="bg-gray-900 text-white p-10 rounded-xl shadow-2xl max-w-4xl w-full border border-white flex flex-col md:flex-row">
        {/* Left Section - Exam Rules */}
        <div className="w-full md:w-1/2 pr-6">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">Exam Rules & Instructions</h1>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-yellow-300 font-semibold">•</span> No Tab Switching – Auto-submission if tab is changed.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-300 font-semibold">•</span> Fullscreen Mode Required – Exiting fullscreen may end your exam.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-300 font-semibold">•</span> Auto Submission – When the timer reaches zero, your exam will be submitted automatically.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-300 font-semibold">•</span> Manual Submission – You can submit before the timer ends.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-300 font-semibold">•</span> One Device Only – Switching devices locks your session.
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[2px] bg-gray-700"></div>

        {/* Right Section - Disqualification Criteria */}
        <div className="w-full md:w-1/2 pl-6 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold text-red-400 mb-4">Disqualification Criteria</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-red-300 font-semibold">•</span> Multiple tab switches will lead to disqualification.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-300 font-semibold">•</span> Exiting fullscreen without permission will end the exam.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-300 font-semibold">•</span> Plagiarism detected will void your submission.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-300 font-semibold">•</span> Unauthorized help (books, AI tools, external sources) is strictly prohibited.
            </li>
          </ul>
        </div>
      </div>

      {/* Start Exam Button */}
      <div className="absolute bottom-10 flex justify-center w-full">
        <button
          className="px-6 py-3 bg-green-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-green-800 transition"
          onClick={onContinue}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default RuleModal;
