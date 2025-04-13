import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RuleModal = ({ onContinue }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [agree,setAgree] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-90 z-50 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen w-full max-w-7xl mx-auto py-5 flex flex-col">
        {/* Header Section */}
        <header className="text-center mb-7">
          <div className="inline-flex items-center gap-3  px-6 py-3">
          
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Examination Rules & Guidelines
            </h1>
          
          </div>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Please read all instructions carefully before proceeding. Violation of any rules may result in automatic disqualification.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow">
          {/* Left Column - General Instructions */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl text-white font-bold">General Instructions</h2>
            </div>
            
            <ul className="space-y-4">
              <RuleItem 
                icon="check" 
                color="blue"
                text="The exam duration is strictly enforced. Timer will be shown throughout."
              />
              <RuleItem 
                icon="check" 
                color="blue"
                text="All answers are final once submitted - no changes allowed."
              />
              <RuleItem 
                icon="check" 
                color="blue"
                text="Use only the provided answer interface - no external documents."
              />
              <RuleItem 
                icon="check" 
                color="blue"
                text="Technical issues must be reported immediately via the help button."
              />
              <RuleItem 
                icon="check" 
                color="blue"
                text="System will auto-save your progress every 30 seconds."
              />
            </ul>
          </div>

          {/* Middle Column - Technical Requirements */}
          <div className="bg-gray-800/50 rounded-xl p-6 border h-full border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-600/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h2 className="text-xl text-white font-bold">Technical Requirements</h2>
            </div>
            
            <ul className="space-y-4">
              <RuleItem 
                icon="monitor" 
                color="purple"
                text="Stable internet connection required throughout the exam."
              />
              <RuleItem 
                icon="fullscreen" 
                color="purple"
                text="Fullscreen mode mandatory - exiting may terminate your session."
              />
              <RuleItem 
                icon="tab" 
                color="purple"
                text="No browser tab switching allowed - system monitors activity."
              />
              <RuleItem 
                icon="device" 
                color="purple"
                text="Single device policy - switching devices will lock your account."
              />
              <RuleItem 
                icon="audio" 
                color="purple"
                text="Disable all pop-up blockers before starting the exam."
              />
            </ul>
          </div>

          {/* Right Column - Prohibited Actions */}
          <div className="bg-gray-800/50 rounded-xl p-6 border h-full border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-600/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl text-white font-bold">Prohibited Actions</h2>
            </div>
            
            <ul className="space-y-4">
              <RuleItem 
                icon="x" 
                color="red"
                text="No communication with others during the exam."
              />
              <RuleItem 
                icon="x" 
                color="red"
                text="Absolutely no external resources (books, websites, notes)."
              />
              <RuleItem 
                icon="x" 
                color="red"
                text="Copying or sharing answers will result in permanent ban."
              />
              <RuleItem 
                icon="x" 
                color="red"
                text="AI assistance (ChatGPT, Copilot, etc.) strictly forbidden."
              />
              <RuleItem 
                icon="x" 
                color="red"
                text="Attempting to bypass security measures is illegal."
              />
            </ul>

      
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <footer className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-gray-400">
              <input type="checkbox" id="agree" value={agree} onChange={()=>setAgree(!agree)} className="w-4 h-4 accent-blue-500" />
              <label htmlFor="agree">I acknowledge that I have read and agree to all exam rules</label>
            </div>
            
            <div className="flex gap-3">
              <button 
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition"
                onClick={() => navigate(`/exams`)}
              >
                Exit Exam
              </button>
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={onContinue}
                id="start-exam-btn"
                disabled = {agree}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Start Exam Now
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const RuleItem = ({ icon, color, text }) => {
  const icons = {
    check: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    ),
    x: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ),
    monitor: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    fullscreen: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    ),
    tab: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    ),
    device: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    ),
    audio: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.314m-11.314 0a7.975 7.975 0 010-11.314m0 0a7.975 7.975 0 015.657-2.343" />
    )
  };

  const colorClasses = {
    blue: {
      bg: 'bg-blue-600/20',
      text: 'text-blue-400',
      border: 'border-blue-500/20'
    },
    purple: {
      bg: 'bg-purple-600/20',
      text: 'text-purple-400',
      border: 'border-purple-500/20'
    },
    red: {
      bg: 'bg-red-600/20',
      text: 'text-red-400',
      border: 'border-red-500/20'
    }
  };

  return (
    <li className="flex items-start gap-3 p-4 bg-gray-900/30 rounded-lg border ${colorClasses[color].border}">
      <div className={`${colorClasses[color].bg} p-2 rounded-lg flex-shrink-0`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colorClasses[color].text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icons[icon]}
        </svg>
      </div>
      <span className="text-gray-300">{text}</span>
    </li>
  );
};

export default RuleModal;