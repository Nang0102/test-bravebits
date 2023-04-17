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
  const token = localStorage.getItem("token");
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
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

export const fetchProfiles = async (username) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(`${BaseURL}/profiles/${username}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const fetchArticleByUser = async (params) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(
      `${BaseURL}/articles?author=${params.author}&limit=5&offet=0`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const fetchFavoritedArticle = async (params) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(
      `${BaseURL}/articles?favorited=${params.author}&limit=5&offet=0`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const addFavorite = async (slug) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(
      `${BaseURL}/articles/${slug}/favorite`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const deleteFavorite = async (slug) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(
      `${BaseURL}/articles/${slug}/favorite`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const fetchArticle = async (params) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(
      `${BaseURL}/articles?limit=200&offset=0`,
      options
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const fetchArticleByTag = async (params) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(
      `${BaseURL}/articles?tag=${params.tag}&limit=${params.limit}&offset=${params.offset}`,
      options
    );
    const data = await response.json();
    console.log("data----byTag", data);
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const fetchArticleFeed = async (params) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(`${BaseURL}/articles/feed`, options);
    // const response = await fetch(
    //   `${BaseURL}/articles/feed?limit=${params.limit}&offset=${params.offset}`,
    //   options
    // );
    console.log("response", response);

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("err", error);
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
