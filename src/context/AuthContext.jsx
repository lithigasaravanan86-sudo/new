import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("edusphere_token"));
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const { showToast } = useToast();

  // Validate existing token on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("edusphere_token");
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authService.getCurrentUser();
        if (response && response.student) {
          setUser(response.student);
          setToken(storedToken);
        } else {
          // Token invalid or expired
          localStorage.removeItem("edusphere_token");
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.warn("Session restore failed:", err.message);
        localStorage.removeItem("edusphere_token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login student with email or register number and password
   */
  const login = async (identifier, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.login(identifier, password);
      if (res && res.token && res.student) {
        localStorage.setItem("edusphere_token", res.token);
        setToken(res.token);
        setUser(res.student);
        showToast(res.message || "Logged in successfully!", "success");
        return { success: true, student: res.student };
      }
      throw new Error("Invalid response format received from authentication server.");
    } catch (err) {
      const errMsg = err.message || "Login failed. Please check your credentials.";
      setAuthError(errMsg);
      showToast(errMsg, "error");
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new student
   */
  const register = async (registrationData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await authService.register(registrationData);
      if (res && res.token && res.student) {
        localStorage.setItem("edusphere_token", res.token);
        setToken(res.token);
        setUser(res.student);
        showToast(res.message || "Student registered successfully!", "success");
        return { success: true, student: res.student };
      }
      throw new Error("Registration failed.");
    } catch (err) {
      const errMsg = err.message || "Registration failed. Please check your inputs.";
      setAuthError(errMsg);
      showToast(errMsg, "error");
      return { success: false, error: errMsg };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout student
   */
  const logout = () => {
    localStorage.removeItem("edusphere_token");
    setToken(null);
    setUser(null);
    setAuthError(null);
    showToast("You have been securely logged out.", "info");
  };

  /**
   * Direct update of user in state (after profile edit)
   */
  const updateUser = (updatedStudent) => {
    setUser(updatedStudent);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isLoading,
        authError,
        login,
        register,
        logout,
        updateUser,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
