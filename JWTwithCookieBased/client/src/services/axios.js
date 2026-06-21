import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL; // Replace with your backend server URL
if (!baseURL) {
  throw new Error(
    "VITE_BACKEND_URL is not defined in the environment variables.",
  );
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // This allows sending cookies with requests
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
