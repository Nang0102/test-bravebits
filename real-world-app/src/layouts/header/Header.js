import { fetchUser } from "actions/HttpsRequest";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "../../App.css";

import { useAuthContext } from "../../store/index";

function Header() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const { profile } = useParams();
  const { state } = useAuthContext();
  const { isAuthenticated, user } = state;
  // const token = localStorage.getItem("token");
  // const [user, setUser] = useState({});
  // console.log("isAuthenticated", isAuthenticated);

  // useEffect(() => {
  //   fetchUser(token)
  //     .then((data) => {
  //       console.log("data--header", data);
  //       setUser(data.user);
  //       console.log("usesr1111--hdd", user);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/#">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* <!-- Add "active" className when you're on that page" --> */}
            <Link
              className={currentRoute === "/" ? "nav-link active" : "nav-link"}
              to="/"
            >
              Home
            </Link>
          </li>

          {user && isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link
                  className={
                    currentRoute === "/editor" ? "nav-link active" : "nav-link"
                  }
                  to="/editor"
                >
                  <i className="ion-compose"></i>New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    currentRoute === "/setting" ? "nav-link active" : "nav-link"
                  }
                  to="/setting"
                >
                  <i className="ion-gear-a"></i>Settings
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    profile === user.username ? "nav-link active" : "nav-link"
                  }
                  to={user.username}
                >
                  <img src={user?.image} alt="" className="user-pic" />
                  {user.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
