import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.reannuinstrella.site/",
});

const auth = axios.create({
  baseURL: "https://auth.reannuinstrella.site/auth",
});

export { instance, auth };
