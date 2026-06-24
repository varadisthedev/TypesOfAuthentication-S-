import React from "react";

import { useState, useEffect } from "react";
import authAPI from "../api/auth";
import { useNavigate } from "react-router-dom";

import { Input } from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";
export default function Login() {
  // navigate obj
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // NOTE: We cannot check for the auth cookie here because it is httpOnly.
  // httpOnly cookies are invisible to JavaScript (document.cookie) by design —
  // this is the security feature that prevents XSS attacks from stealing tokens.
  // The server will reject requests with an invalid/missing cookie automatically.
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form submission default browser behavior
    if (!inputEmail || !inputPassword) {
      setError("Please fill in all fields");
      return;
    }
    // checking if both the password matches
    if (inputPassword !== confirmPassword) {
      setError("Passwords do not match");
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
        // No need to set isLoggedIn — the httpOnly cookie is already set on the
        // server and will be sent with all subsequent requests.
        // ProtectedRoute will handle auth checks automatically.
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
    <Card className="bg-slate-950  flex flex-col border-2 border-zinc-400 gap-2 m-4 items-center">
      {isLoggedIn && <h1>Already logged in.</h1>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={
          error && !confirmPassword
            ? "Please confirm your password"
            : "" || (error && inputPassword !== confirmPassword)
              ? "Passwords do not match"
              : ""
        }
      />
      <Button onClick={handleLogin}>Login</Button>
    </Card>
  );
}
