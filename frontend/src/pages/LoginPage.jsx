import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login(registerNumber, password);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 animate-gradient-shift"></div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMEg0MFY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDBINDBNNDAgMEg0MFY0ME0wIDQwVjQwIiBzdHJva2U9IiMzMzM4NDIiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-[3%]"></div>

      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-sm shadow-2xl rounded-xl p-8 border border-gray-800/50 mx-4 animate-fade-in">
        {/* Logo/Header Section */}
        <div className="flex flex-col items-center mb-8 transform transition-transform duration-300 hover:scale-[1.02]">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-4 shadow-lg animate-pulse-slow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Exam Portal
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Secure access to your examinations
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-sm text-red-200 flex items-center gap-2 animate-shake">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Register Number Field */}
          <div className="space-y-1 transition-all duration-300 hover:translate-x-[2px]">
            <label className="text-sm text-gray-400 font-medium">
              Register Number
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 bg-gray-800/70 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 outline-none transition-all text-white shadow-sm placeholder-gray-500 font-mono tracking-wide"
                placeholder="Enter your register number"
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1 transition-all duration-300 hover:translate-x-[2px]">
            <label className="text-sm text-gray-400 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full p-3 bg-gray-800/70 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30 outline-none transition-all text-white shadow-sm placeholder-gray-500 font-mono tracking-wide"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-3 rounded-lg font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${
              isLoading
                ? "bg-blue-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/20"
            } transform hover:scale-[1.01] active:scale-[0.99]`}
          >
            {isLoading ? (
              <>
                <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Authenticating...
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
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Login
              </>
            )}
          </button>
        </form>

        {/* Footer Text */}
        <div className="text-center mt-6 text-sm text-gray-500 animate-pulse-slow">
          <p>Need help? Contact your system administrator</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gray-700"></div>
            <span className="text-xs">SECURE ACCESS</span>
            <div className="h-px w-8 bg-gray-700"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;