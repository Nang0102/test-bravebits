import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../../App.css";
import { updateUser } from "../../actions/HttpsRequest";
import InputUserName from "components/input/InputUsername";
import { useAuthContext } from "store";
import InputImage from "./InputImg";
import InputEmail from "components/input/InputEmail";
import InputPassword from "components/input/InputPassword";
import InputBio from "./InputBio";

function Setting() {
  // const { handleLogout, handleUpdateUser } = useAuthContext();
  // const currentUser = JSON.parse(localStorage.getItem("user"));
  // console.log("currentUser", currentUser);
  // const [errors, setErrors] = useState(null);
  // const [userName, setUserName] = useState(currentUser?.username);
  // const [email, setEmail] = useState(currentUser?.email);
  // const [password, setPassword] = useState("");
  // const [imgUrl, setImgUrl] = useState(currentUser?.image);
  // const [bio, setBio] = useState(currentUser?.bio || "");

  const { handleLogout, handleUpdateUser } = useAuthContext();
  const currentUser = JSON.parse(localStorage.getItem("user")) || null;

  const [imageURL, setImageURL] = useState(currentUser?.image);
  const [username, setUserName] = useState(currentUser?.username);
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleUpdateSetting = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      setUserName(currentUser.username);
    } else {
      const userUpdated = {
        email: email,
        password: password,
        username: username,
        bio: bio,
        image: imageURL,
      };
      updateUser({
        user: userUpdated,
      })
        .then((data) => {
          console.log(data.user);
          handleUpdateUser(data.user);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="settings-page">
      {!currentUser && <Navigate to="/" replace={true} />}
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

// import React, { useState } from "react";
// import "../../App.css";
// import { updateUser } from "../../actions/HttpsRequest";
// import InputUserName from "components/input/InputUsername";
// import { useAuthContext } from "store";
// import InputImage from "./InputImg";
// import InputEmail from "components/input/InputEmail";
// import InputPassword from "components/input/InputPassword";
// import InputBio from "./InputBio";

// function Setting() {
//   const { handleLogout, handleUpdateUser } = useAuthContext();
//   const currentUser = JSON.parse(localStorage.getItem("user"));
//   console.log("currentUser", currentUser);
//   const [errors, setErrors] = useState(null);
//   const [userName, setUserName] = useState(currentUser?.username);
//   const [email, setEmail] = useState(currentUser?.email);
//   const [password, setPassword] = useState("");
//   const [imgUrl, setImgUrl] = useState(currentUser?.image);
//   const [bio, setBio] = useState(currentUser?.bio || "");

//   const handleClickBtnUpdate = (e) => {
//     e.preventDefault();
//     if (userName === "") {
//       setUserName(currentUser.username);
//     } else {
//       const userUpdated = {
//         email: email,
//         password: password,
//         username: userName,
//         bio: bio,
//         image: imgUrl,
//       };
//       updateUser({ user: userUpdated })
//         .then((data) => {
//           handleUpdateUser(data);
//         })
//         .catch((err) => console.log(err));
//     }
//   };
//   const handleClickBtnLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     handleLogout();
//   };

//   return (
//     <div className="settings-page">
//       <div className="container page">
//         <div className="row">
//           <div className="col-md-6 offset-md-3 col-xs-12">
//             <h1 className="text-xs-center">Your Settings</h1>

//             <form>
//               <fieldset>
//                 <InputImage setErrors={setErrors} setImgUrl={setImgUrl} />
//                 <InputUserName
//                   setErrors={setErrors}
//                   setUserName={setUserName}
//                   userName={userName}
//                 />
//                 <InputBio bio={bio} setBio={setBio} setErrors={setErrors} />

//                 <InputEmail
//                   email={email}
//                   setEmail={setEmail}
//                   setErrors={setErrors}
//                 />
//                 <InputPassword
//                   password={password}
//                   setPassword={setPassword}
//                   setErrors={setErrors}
//                 />
//                 <button
//                   className="btn btn-lg btn-primary pull-xs-right"
//                   onClick={handleClickBtnUpdate}
//                 >
//                   Update Settings
//                 </button>
//               </fieldset>
//             </form>
//             <hr />
//             <button
//               className="btn btn-outline-danger"
//               onClick={handleClickBtnLogout}
//             >
//               Or click here to logout.
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Setting;
