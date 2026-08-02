import { useEffect, useState } from "react";
import * as AuthService from "./../services/auth.service";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await AuthService.getMe();
        console.log("response.data.user : ", response.data.user);
        
        setUser(response.data.user);
      } catch (err) {
        console.error("[GetMe]", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const logout = () => {
    // Codes
  };

  const value = {
    user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
