import axios from "axios";
import { baseURL } from "./constant";

export const fetchBoardDetail = async () => {
  const request = await axios.get(`${baseURL}/board/fullboard`);
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

export const createNewCard = async (data) => {
  console.log("request", data);
  const request = await axios.post(`${baseURL}/card`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  });
  console.log("result");
  return request.data;
};
