import axios from "axios";
import { BaseURL } from "./Constant";

export const register = async (data) => {
  const response = await axios.post(`${BaseURL}/users`, data, {
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.data;
};
