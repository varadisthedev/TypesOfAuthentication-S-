import axiosInstance from "../services/axios";

export const authAPI = {
  register: (userData) => axiosInstance.post("/register", userData),
  login: (credentials) => axiosInstance.post("/login", credentials),
  logout: () => axiosInstance.post("/logout"),
  getProfile: () => axiosInstance.get("/profile"),
};

export default authAPI;
