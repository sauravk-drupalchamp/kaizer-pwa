import { createContext, useContext, useState } from "react";
import { message } from "antd";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const log = sessionStorage.getItem('login');
  const [isLoggedIn, setIsLoggedIn] = useState(log ? log : false);
  
  const login = () => {
    // console.log("Auth Context Login Function")
    setIsLoggedIn(true);
    sessionStorage.setItem("login", true);
    message.success("Successfully Logged In");
    <Navigate to={'/'} />
  };

  const logout = () => {
    sessionStorage.removeItem("crsf_token");
    sessionStorage.removeItem("logout_token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("login");
    message.success("Logged Out!")
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
