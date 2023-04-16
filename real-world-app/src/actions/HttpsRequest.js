import axios from "axios";
import { BaseURL } from "./Constant";

export const register = async (userRegister) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(userRegister),
    };
    const response = await fetch(`${BaseURL}/users`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

export const login = async (userLogin) => {
  const token = localStorage.getItem("token");
  console.log("token Login", token);

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(userLogin),
    };
    const response = await fetch(`${BaseURL}/users/login`, options);
    const data = await response.json();
    console.log("data-login", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

export const fetchUser = async (user) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(`${BaseURL}/user`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

export const updateUser = async (params) => {
  console.log("params", params);
  const token = localStorage.getItem("token");
  console.log("token", token);
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(params),
    };
    const response = await fetch(`${BaseURL}/user`, options);
    console.log("res", response);
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

export const fetchTags = async () => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const res = await fetch(`${BaseURL}/tags`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
