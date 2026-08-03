import axios from "axios";

const api = axios.create({
  baseURL: "/api", // proxied to http://localhost:5000/api by vite.config.js
  headers: { "Content-Type": "application/json" },
});

export default api;
