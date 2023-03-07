import axios from "axios";

const instance = axios.create({
  baseURL: "http://178.128.58.213:5000",
});

const auth = axios.create({
  baseURL: "http://178.128.58.213:4000",
});

export { instance, auth };
