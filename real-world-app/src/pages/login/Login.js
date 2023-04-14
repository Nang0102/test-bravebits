import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Input from "components/input/Input";
import { useAuthContext } from "store";
import { login } from "actions/HttpsRequest";

export default function Login() {
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, state } = useAuthContext();
  const { user } = state;
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors(null);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors(null);
  };
  const handleClickBtnLogin = (e) => {
    e.preventDefault();
    if (email === "") {
      setErrors("Email cannot be empty!");
    }
    if (password === "") {
      setErrors("Password cannot be empty!");
    }
    const userLogin = {
      email: email,
      password: password,
    };
    login({ user: userLogin }).then((data) => {
      if (data.errors) {
        setErrors(
          Object.keys(data.errors).toString() +
            " " +
            Object.values(data.errors).toString()
        );
      } else {
        handleLogin(data.user);
        localStorage.setItem("token", data.user.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setErrors(null);
        setEmail("");
        setPassword("");
      }
    });
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}

      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>
              <ul className="error-messages">{errors && <li>{errors}</li>}</ul>

              <form onSubmit={handleClickBtnLogin}>
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
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
