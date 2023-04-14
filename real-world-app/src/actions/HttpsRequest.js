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
