import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [authData, setAuthData] = useState({
    user: null,
    isLogged: false,
  });

  useEffect(() => {
    // Quando authData cambia, aggiorna anche isLogged
    setIsLogged(authData.isLogged);
  }, [authData]);

  const mockUserData = {
    email: "test@example.com",
    password: "123",
  };

  const login = async (email, password) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === mockUserData.email && password === mockUserData.password) {
        localStorage.setItem(
          "authData",
          JSON.stringify({ user: mockUserData, isLogged: true })
        );
        setAuthData({ user: mockUserData, isLogged: true });
        console.log("Login effettuato");
        return true;
      } else {
        console.error("Login fallito. Credenziali non valide.");
        return false;
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authData");
    setAuthData({ user: null, isLogged: false });
  };

  return (
    <AuthContext.Provider value={{ isLogged, authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
