import axios from "axios";
import { baseURL } from "./constant";

const api = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Credentials": true,
  },
});

export const updateBoard = async (id, data) => {
  const request = await api.put(`/board/${id}`, data, {});
  return request.data;
};

export const fetchBoardDetail = async (id) => {
  const request = await axios.get(`${baseURL}/board/fullboard/${id}`);
  return request.data;
};

export const createNewColumn = async (data) => {
  const request = await axios.post(`${baseURL}/column`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  return request.data;
};

export const updateColumn = async (id, data) => {
  const request = await axios.put(`${baseURL}/column/${id}`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  return request.data;
};
export const updateTitle = async (id, data) => {
  const request = await axios.put(`${baseURL}/column/${id}`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  return request.data;
};

export const deleteColumn = async (id, data) => {
  const request = await axios.put(`${baseURL}/column/${id}`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  return request.data;
};

export const createNewCard = async (data) => {
  const request = await axios.post(`${baseURL}/card`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  return request.data;
};

export const updateCard = async (id, data) => {
  const request = await axios.put(`${baseURL}/card/${id}`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  return request.data;
};

export const updateCardTitle = async (id, data) => {
  const request = await axios.put(`${baseURL}/card/${id}`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  return request.data;
};

export const deleteCard = async (id, data) => {
  const request = await axios.put(`${baseURL}/card/${id}`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  return request.data;
};
