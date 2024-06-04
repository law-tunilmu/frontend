import axios from "axios";

const appServerAxios = axios.create({
  baseURL: process.env.REACT_APP_FORUM_BE,
  headers: {
    "Content-type": "application/json",
  },
});

export { appServerAxios };
