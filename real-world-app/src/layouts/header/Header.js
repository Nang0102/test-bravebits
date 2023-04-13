import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/#">
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* <!-- Add "active" className when you're on that page" --> */}
            <NavLink className="nav-link active" to="/#">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/editor">
              <i className="ion-compose"></i>New Article
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/setting">
              <i className="ion-gear-a"></i>Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Sign in
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
