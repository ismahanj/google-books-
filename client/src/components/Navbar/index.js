import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Google Books Search
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                window.location.pathname === "/" || window.location.pathname === "/Books"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Search"
              className={window.location.pathname === "/Search" ? "nav-link active" : "nav-link"}
            >
             Search
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/Save"
              className={window.location.pathname === "/Save" ? "nav-link active" : "nav-link"}
            >
             Saved Books
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
