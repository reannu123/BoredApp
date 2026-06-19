import axios from "axios";

// Base URLs are configured at build time via Create React App env vars
// (REACT_APP_*). They default to the local dev servers so the app runs after a
// plain `npm start` with no extra setup. See client/.env.example.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const AUTH_URL = process.env.REACT_APP_AUTH_URL || "http://localhost:5001/auth";

const instance = axios.create({
  baseURL: API_URL,
});

const auth = axios.create({
  baseURL: AUTH_URL,
});

export { instance, auth };
