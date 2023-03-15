import axios from "axios";

const instance = axios.create({
  baseURL: "https://reannuinstrella.tech/",
});

const auth = axios.create({
  baseURL: "https://reannuinstrella.tech/auth",
});

export { instance, auth };
