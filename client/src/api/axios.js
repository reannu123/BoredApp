import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const auth = axios.create({
  baseURL: "http://localhost:4000",
});

export { instance, auth };
