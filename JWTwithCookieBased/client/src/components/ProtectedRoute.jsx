// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import authAPI from "../api/auth";

// Verifies auth by pinging the server — the httpOnly cookie is sent
// automatically by the browser, so we never need to read it in JS.
export default function ProtectedRoute({ children }) {
  const [isAuthed, setIsAuthed] = useState(null); // null = still checking

  useEffect(() => {
    authAPI
      .getProfile()
      .then(() => {
        console.log("Cookie valid — user is authenticated.");
        setIsAuthed(true);
      })
      .catch(() => {
        console.log("No valid session — redirecting to login.");
        setIsAuthed(false);
      });
  }, []);

  if (isAuthed === null) return <p>Checking session...</p>; // loading
  if (!isAuthed) return <Navigate to="/login" replace />;
  return children;
}
