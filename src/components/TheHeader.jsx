import React from "react";
import style from "../css/modules/TheHeader.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function TheHeader() {
  const { isLogged, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={style.header}>
      <h1>Il mio Blog</h1>
      <Link to="/">
        <p>Home Page</p>
      </Link>
      {isLogged && (
        <Link to="/form">
          <p>Add Post</p>
        </Link>
      )}
      {isLogged ? (
        <p onClick={handleLogout}>Logout</p>
      ) : (
        <Link to="/login">
          <p>Login</p>
        </Link>
      )}
    </header>
  );
}
