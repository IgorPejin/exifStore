import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigate();

  const login = (token, email, username) => {
    setToken(token);
    setEmail(email);
    setUsername(username);
    setIsAuthenticated((isAuthenticated) => !isAuthenticated);
    navigation(`/${username}`);
  };

  const logout = () => {
    setToken(null);
    setEmail("");
    setUsername("");
    setIsAuthenticated(false);
    navigation("/login");
  };

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
    email,
    username,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
