import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Warning({ onClose, examData, violationCount }) {
  const navigate = useNavigate();

  // Auto-close warning after 15 seconds if user doesn't respond
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 15000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleContinue = () => {
    onClose();
  };

  const handleTerminate = () => {
    navigate('/exam/finish', {
      state: {
        answers: examData?.code || '',
        testCases: examData?.results || [],
        terminated: true,
        reason: 'Manual termination after warning'
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-200">
        {/* Header with dynamic color based on violation count */}
        <div className={`p-5 flex items-center justify-center ${
          violationCount >= 1 ? 'bg-red-50' : 'bg-yellow-50'
        }`}>
          <div className={`p-3 rounded-full ${
            violationCount >= 1 ? 'bg-red-100' : 'bg-yellow-100'
          }`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-8 w-8 ${
                violationCount >= 1 ? 'text-red-600' : 'text-yellow-600'
              }`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {violationCount >= 1 ? 'Final Warning' : 'Exam Violation'}
          </h2>
          
          <p className="text-gray-600 mb-4">
            {violationCount >= 1 
              ? 'This is your final warning! The exam will be submitted if you violate rules again.'
              : 'You violated exam rules (tab switch, key press, or fullscreen exit).'}
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg 
                  className="h-5 w-5 text-yellow-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Violation {violationCount + 1} of 2:</strong> {violationCount >= 1 
                    ? 'Next violation will automatically submit your exam.'
                    : 'Please remain focused on the exam window.'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {violationCount >= 1 && (
              <button
                onClick={handleTerminate}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                End Exam Now
              </button>
            )}
            <button
              onClick={handleContinue}
              className={`flex-1 px-4 py-2 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                violationCount >= 1 
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {violationCount >= 1 ? 'Continue Carefully' : 'Continue Exam'}
            </button>
          </div>
        </div>
      </div>

      {/* Auto-close countdown indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
          Auto-closing in 15 seconds
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Warning;