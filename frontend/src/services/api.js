import axios from "axios";

// SERVER URL
export const BASE_URL = "http://localhost:8000";

// API INSTANCE
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// AUTO TOKEN
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error),
);

export default API;
