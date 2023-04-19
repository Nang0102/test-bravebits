import { register } from "actions/HttpsRequest";
import InputUserName from "components/input/InputUsername";
import InputEmail from "components/input/InputEmail";
import InputPassword from "components/input/InputPassword";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "store";
import "../../App.css";

function Register() {
  const [errors, setErrors] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuthContext();
  const navigate = useNavigate();

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

    const userRegister = {
      username: userName,
      email: email,
      password: password,
    };

    register({ user: userRegister }).then((data) => {
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
        setUserName("");
        navigate(`/`);
      }
    });
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

            <ul className="error-messages">{errors && <li>{errors}</li>}</ul>

            <form>
              <InputUserName
                setErrors={setErrors}
                setUserName={setUserName}
                userName={userName}
              />
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
