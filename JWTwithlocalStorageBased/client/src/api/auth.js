import axiosInstance from "./axiosInstance";

// ─── Auth API ─────────────────────────────────────────────────────────────────

/**
 * Register a new user.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise} { token, user }
 */
export const register = (name, email, password) =>
  axiosInstance.post("/user/register", { name, email, password });

/**
 * Log in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise} { token, user }
 */
export const login = (email, password) =>
  axiosInstance.post("/user/login", { email, password });

/**
 * Fetch the logged-in user's profile. (Protected — JWT required)
 * @returns {Promise} { user }
 */
export const getProfile = () => axiosInstance.get("/user/profile");

/**
 * Update the logged-in user's hobbies. (Protected — JWT required)
 * @param {string[]} hobbies
 * @returns {Promise} { user }
 */
export const updateHobbies = (hobbies) =>
  axiosInstance.put("/user/hobbies", { hobbies });
