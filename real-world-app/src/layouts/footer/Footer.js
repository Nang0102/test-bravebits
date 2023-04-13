import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";

function Footer() {
  return (
    <footer>
      <div className="container">
        <Link to="/" className="logo-font">
          conduit
        </Link>
        <span className="attribution">
          An interactive learning project from
          <Link to="https://thinkster.io">Thinkster</Link>. Code design licensed
          under MIT.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
