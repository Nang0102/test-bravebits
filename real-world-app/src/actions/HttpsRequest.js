import { BaseURL } from "./Constant";
import axios from "axios";

const token = localStorage.getItem("token");
const options = {
  headers: {
    "Content-Type": "application/json",
    authorization: token ? `Token ${token}` : null,
  },
};

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
    console.log("----", data);
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
    console.log("httt", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

export const updateUser = async (params) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  console.log("params", params);
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
    console.log("data", data);
    return data.user;
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

export const addFavorite = async (params) => {
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
      `${BaseURL}/articles/${params}/favorite`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const deleteFavorite = async (params) => {
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
      `${BaseURL}/articles/${params}/favorite`,
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
    console.log("article-user", data);
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const getDataDetail = async (params) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(`${BaseURL}/articles/${params}`, options);
    const data = await response.json();
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
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const fetchArticleFeed = async (params) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    // const response = await fetch(`${BaseURL}/articles/feed`, options);
    const response = await fetch(
      `${BaseURL}/articles/feed?limit=${params.limit}&offset=${params.offset}`,
      options
    );
    console.log("res", response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const createArticle = async (params) => {
  const token = localStorage.getItem("token");

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(params),
    };
    const response = await fetch(`${BaseURL}/articles`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const updateArticle = async (slug, params) => {
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
    const res = await fetch(`${BaseURL}/articles/${slug}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteArticle = async (slug) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
    };
    const response = await fetch(`${BaseURL}/articles/${slug}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const followUser = async (username) => {
  try {
    const res = await axios.post(
      `${BaseURL}/profiles/${username}/follow`,
      {},
      {
        headers: options.headers,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const unFollowUser = async (username) => {
  try {
    const res = await axios.delete(
      `${BaseURL}/profiles/${username}/follow`,
      options
    );
    console.log("data-UNfollow-user----", res.data);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getComment = async (slug) => {
  try {
    const res = await axios.get(`${BaseURL}/articles/${slug}/comments`, {
      headers: options.headers,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createComment = async (params, value) => {
  const token = localStorage.getItem("token");
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `Token ${token}` : null,
      },
      body: JSON.stringify(value),
    };
    const response = await fetch(
      `${BaseURL}/articles/${params}/comments`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("err", error);
  }
};

export const deleteComment = async (params, id) => {
  try {
    const res = await axios.delete(
      `${BaseURL}/articles/${params}/comments/${id}`,
      {
        headers: options.headers,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
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
