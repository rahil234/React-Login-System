// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/", // Change this to your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API call error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;