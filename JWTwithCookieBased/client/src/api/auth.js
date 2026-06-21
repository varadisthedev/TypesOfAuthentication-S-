import axiosInstance from "../services/axios";

export const authAPI = {
  register: (userData) => axiosInstance.post("/api/register", userData),
  login: (credentials) => axiosInstance.post("/api/login", credentials),
  logout: () => axiosInstance.post("/api/logout"),
  getProfile: () => axiosInstance.get("/api/profile"),
};

export default authAPI;
