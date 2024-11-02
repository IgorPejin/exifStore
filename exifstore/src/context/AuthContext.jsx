import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [token, setToken] = useState(null);

  const login = (token) => {
    setIsAuthenticated(true);
    setToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };
