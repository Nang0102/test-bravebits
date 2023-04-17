import React, { useState } from "react";
import "../../App.css";
import { updateUser } from "../../actions/HttpsRequest";
import Input from "components/input/Input";
import { useAuthContext } from "store";

function Setting() {
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;
  const { handleLogout, handleUpdateUser } = useAuthContext();
  const [errors, setErrors] = useState(null);
  const [userName, setUserName] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState(currentUser?.image);
  const [bio, setBio] = useState(currentUser?.bio || "");

  const handleClickBtnUpdate = (e) => {
    e.preventDefault();
    if (userName === "") {
      setUserName(currentUser.username);
    } else {
      const userUpdated = {
        email: email,
        password: password,
        username: userName,
        bio: bio,
        image: imgUrl,
      };
      updateUser({ user: userUpdated })
        .then((data) => {
          handleUpdateUser(data);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleClickBtnLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleLogout();
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form>
              <fieldset>
                <Input
                  placeholder="URL of profile picture"
                  type="text"
                  onChange={(e) => {
                    setImgUrl(e.target.value);
                    setErrors(null);
                  }}
                />
                <Input
                  placeholder="Your Name"
                  type="text"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    setErrors(null);
                  }}
                />
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    onChange={(e) => {
                      setBio(e.target.value);
                      setErrors(null);
                    }}
                  ></textarea>
                </fieldset>

                <Input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(null);
                  }}
                />
                <Input
                  type="password"
                  placeholder="Password "
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(null);
                  }}
                />
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={handleClickBtnUpdate}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              className="btn btn-outline-danger"
              onClick={handleClickBtnLogout}
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
