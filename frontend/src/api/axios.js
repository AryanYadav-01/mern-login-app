import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-login-app-9scr.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export default api;