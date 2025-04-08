import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(registerNumber, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white relative">
      {/* Background Overlay with Subtle Circuit Pattern */}
      <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-cover opacity-10"></div>

      {/* Login Container */}
      <div className="relative z-10 w-[400px] bg-gray-900 shadow-lg rounded-xl p-8 border border-gray-800">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Exam Login Portal
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Input Fields */}
          <div className="relative">
            <label className="text-sm text-gray-400">Register Number</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-white shadow-md placeholder-gray-500 font-mono"
              placeholder="Enter your register number"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-white shadow-md placeholder-gray-500 font-mono"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-3 rounded-lg font-semibold text-lg transition-all shadow-md">
            Login
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-gray-500 text-center text-sm mt-6">
          Access restricted to registered students.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
