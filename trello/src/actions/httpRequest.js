import axios from "axios";
import { baseURL } from "./constant";

export const updateBoard = async (id, data) => {
  const request = await axios.put(`${baseURL}/board/${id}`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
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
  console.log("request", data);
  const request = await axios.put(`${baseURL}/card/${id}`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  console.log("response is ", request);
  return request.data;
};
