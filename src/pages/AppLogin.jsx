import React, { useState, useEffect } from "react";
import style from "../css/modules/appLogin.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AppLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se l'utente è già autenticato, reindirizza alla pagina di dashboard
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const loginSuccess = await login(email, password);
      console.log("Login success:", loginSuccess);
      if (loginSuccess) {
        // La navigazione viene spostata all'interno di useEffect
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={style.ContainerForm}>
        <form onSubmit={handleLogin}>
          <div className={style.InputStyle}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.InputStyle}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
