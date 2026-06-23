import React from "react";

import { useState, useEffect } from "react";
import authAPI from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // navigate obj
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log("Token found, user is logged in. Redirecting to dashboard.");
      navigate("/dashboard");
    }
    setIsLoading(false);
  }, [navigate]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form submission default browser behavior
    if (!inputEmail || !inputPassword) {
      setError("Please fill in all fields");
      return;
    }
    console.log("Logging in with:", inputEmail, inputPassword);
    try {
      const response = await authAPI.login({
        email: inputEmail,
        password: inputPassword,
      });

      // backend uses cookie
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/dashboard"); // Redirect to dashboard after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}
