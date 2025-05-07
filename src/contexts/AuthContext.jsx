import React, { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);

	const navigate = useNavigate();
	const logout = () => {
    setUserInfo(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/aseman-hotel");
  };







  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
