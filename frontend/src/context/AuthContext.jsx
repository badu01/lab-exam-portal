import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Auto-login on refresh (restore user from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (registerNumber, dob) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registerNumber, dob }),
      });

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (data.success && data.student) {
        setUser(data.student);

        // Store user session in localStorage
        localStorage.setItem("user", JSON.stringify(data.student));

        navigate("/exams");
      } else {
        alert("Invalid credentials. Please check your register number and DOB.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear session
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
