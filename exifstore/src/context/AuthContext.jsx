import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");

  const navigation = useNavigate();

  const login = (token, email, username) => {
    setIsAuthenticated((isAuthenticated) => !isAuthenticated);
    setToken(token);
    setEmail(email);
    navigation(`/${username}`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setEmail("");
    navigation("/login");
  };

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
    email,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
