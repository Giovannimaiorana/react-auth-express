import style from "../css/modules/TheHeader.module.css";
import { Link } from "react-router-dom";
export default function TheHeader() {
  return (
    <header className={style.header}>
      <h1>Il mio Blog</h1>
      <Link to="/">
        {" "}
        <p>Home Page</p>{" "}
      </Link>
      <Link to="/form">
        {" "}
        <p>Add Post</p>
      </Link>
      <Link to="/login">
        {" "}
        <p>Login</p>
      </Link>
    </header>
  );
}
