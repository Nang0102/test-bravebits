import Input from "components/input/Input";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

function Register() {
  const [errors, setErrors] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setErrors(null);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors(null);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors(null);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (userName === "") {
      setErrors("Username cannot be empty!");
    }
    if (email === "") {
      setErrors("Email cannot be empty!");
    }
    if (password === "") {
      setErrors("Password cannot be empty!");
    }
    // -----------
    const userRegister = {
      username: userName,
      email: email,
      password: password,
    };
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ul className="error-messages">
              {errors && <li>{errors}</li>}
              {/* <li>That email is already taken</li> */}
            </ul>

            <form>
              <Input
                type="text"
                placeholder="Your Name "
                value={userName}
                onChange={handleUserNameChange}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <Input
                type="password"
                placeholder="Password "
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                onClick={handleRegister}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
