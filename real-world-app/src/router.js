import Article from "pages/arcticle/Article";
import Home from "pages/home/Home";
import Login from "pages/login/Login";
import Register from "pages/register/Register";
import Setting from "pages/setting/Setting";
import Profile from "pages/profile/Profile";
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
