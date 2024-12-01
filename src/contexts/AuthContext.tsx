import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  role: "admin" | "consumer";
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string, role: "admin" | "consumer") => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("webill_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: "admin" | "consumer") => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy validation
      if (email === "admin@webill.com" && password === "admin123" && role === "admin") {
        const userData: User = {
          id: "1",
          email,
          role: "admin",
          name: "Admin User",
        };
        setUser(userData);
        localStorage.setItem("webill_user", JSON.stringify(userData));
        toast.success("Welcome back, Admin!");
        navigate("/admin/dashboard");
      } else if (email === "user@webill.com" && password === "user123" && role === "consumer") {
        const userData: User = {
          id: "2",
          email,
          role: "consumer",
          name: "John Doe",
        };
        setUser(userData);
        localStorage.setItem("webill_user", JSON.stringify(userData));
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("webill_user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}