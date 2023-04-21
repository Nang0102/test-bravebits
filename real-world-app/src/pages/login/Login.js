import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "store";
import { login, fetchUser } from "actions/HttpsRequest";
import InputEmail from "components/input/InputEmail";
import InputPassword from "components/input/InputPassword";

export default function Login() {
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, state } = useAuthContext();
  // const { isAuthenticated,user } = state;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser(token)
      .then((data) => {
        setUser(data.user);
        console.log("usesr", user);
      })
      .catch((err) => console.log(err));
  }, []);

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
      console.log("login", data);
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
        navigate("/");
        setErrors(null);
        setEmail("");
        setPassword("");
      }
    });
  };

  return (
    <>
      {/* {user && <Navigate to="/" replace={true} />} */}

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
                <InputEmail
                  email={email}
                  setEmail={setEmail}
                  setErrors={setErrors}
                />
                <InputPassword
                  password={password}
                  setPassword={setPassword}
                  setErrors={setErrors}
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
