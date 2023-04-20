import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { startCase } from "lodash";
import "../../App.css";
import { fetchUser, updateUser } from "../../actions/HttpsRequest";
import InputUserName from "components/input/InputUsername";
import { useAuthContext } from "store";
import InputImage from "./InputImg";
import InputEmail from "components/input/InputEmail";
import InputPassword from "components/input/InputPassword";
import InputBio from "./InputBio";

function Setting() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  const { handleLogout, handleUpdateUser, state } = useAuthContext();
  // const { user } = state;
  // const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  // const currentUser = { user };
  const [imageURL, setImageURL] = useState("");
  const [username, setUserName] = useState("");
  // const [bio, setBio] = useState(currentUser?.bio);
  // const [email, setEmail] = useState(currentUser?.email);
  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState(null);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  function normalizeUsername(username) {
    return startCase(username).replace(/\s/g, "");
  }
  useEffect(() => {
    fetchUser(token)
      .then((data) => {
        console.log("uuuu", data.user.username);
        setUser(data.user);
        setBio(data.user.bio);
        setEmail(data.user.email);
        setUserName(data.user.username);
        setImageURL(data.user.image);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateSetting = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setUserName(user.username);
    } else {
      const userUpdated = {
        email: email,
        password: password,
        username: username,
        bio: bio,
        image: imageURL,
      };
      console.log("----userUpdated", userUpdated.username);
      updateUser({
        user: userUpdated,
      })
        .then((data) => {
          console.log(data);
          handleUpdateUser(data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="settings-page">
      {!user && <Navigate to="/" replace={true} />}
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form>
              <fieldset>
                <InputImage imageURL={imageURL} setImageURL={setImageURL} />
                <InputUserName
                  username={username}
                  setUserName={setUserName}
                  setErrors={setErrors}
                />
                <InputBio bio={bio} setBio={setBio} setErrors={setErrors} />
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
                  onClick={handleUpdateSetting}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                handleLogout();
              }}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
