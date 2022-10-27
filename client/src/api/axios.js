import axios from "axios";

const instance = axios.create({
  baseURL: "http://139.59.115.248:5000",
});

const auth = axios.create({
  baseURL: "http://139.59.115.248:4000",
});

export { instance, auth };
