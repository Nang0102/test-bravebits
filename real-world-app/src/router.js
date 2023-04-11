import Article from "components/arcticle/Article";
import Home from "components/home/Home";
import Login from "components/login/login";
import Register from "components/register/Register";
import Setting from "components/setting/Setting";
import Profile from "components/profile/Profile";
import React from "react";
import { Routes, Route } from "react-router-dom";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Article />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:profile" element={<Profile />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} /> */}
      </Routes>
    </div>
  );
}

export default Router;
