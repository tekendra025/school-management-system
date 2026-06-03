import axios from "axios";

// SERVER URL
export const BASE_URL = "https://school-management-system-vrne.onrender.com";

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
