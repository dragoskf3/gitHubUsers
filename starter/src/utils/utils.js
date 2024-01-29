import axios from "axios";

export const customInstance = axios.create({
  baseURL: "https://api.github.com",
});
