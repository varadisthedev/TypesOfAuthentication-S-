import React from "react";

import { useState, useEffect } from "react";
import authAPI from "../api/auth";
import { useNavigate } from "react-router-dom";

// components
import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";

export default function SignUp() {
  // navigate obj
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [inputName, setInputName] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const token = document.cookie;
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
      console.log("Token found, user is logged in. Redirecting to dashboard.");
      navigate("/dashboard");
    }
    setIsLoading(false);
  }, [navigate]);

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault(); // prevent form submission default browser behavior
    if (!inputEmail || !inputPassword) {
      setError("Please fill in all fields");
      return;
    }
    console.log("creating account with:", inputEmail, inputPassword);
    try {
      const response = await authAPI.register({
        email: inputEmail,
        password: inputPassword,
      });

      // backend uses cookie
      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate("/dashboard"); // Redirect to dashboard after successful signup
      }
    } catch (error) {
      console.error("signup error:", error);
      setError(
        error.response?.data?.message || "signup failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <h3>Sign Up</h3>
      <Input
        label="Name"
        type="text"
        placeholder="Name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        error={error && !inputName ? "Name is required" : ""}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        error={error && !inputEmail ? "Email is required" : ""}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
        error={error && !inputPassword ? "Password is required" : ""}
      />
      <Button onClick={handleSignup}>signup </Button>
    </Card>
  );
}
