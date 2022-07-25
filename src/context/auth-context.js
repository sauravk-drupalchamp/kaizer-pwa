import { createContext, useContext, useState } from "react";
import { message } from "antd";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (isLoggedIn) => {
    console.log("Auth Context Login Function")
    setIsLoggedIn(isLoggedIn);
    window.location.href = "/";
    message.success("Successfully Logged In");
  };

  const logout = () => {
    sessionStorage.removeItem("crsf_token");
    sessionStorage.removeItem("logout_token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("user_id");
    message.success("Logged Out!")
    setIsLoggedIn(false);
    // window.location.href = "/";
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
