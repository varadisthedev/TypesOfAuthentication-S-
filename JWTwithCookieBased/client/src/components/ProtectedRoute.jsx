// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// works like a middleware 
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  // Checks for local storage token ,does not use cookie

  if (!token) {
    // Redirect to login if not authenticated
    console.log("No token found, redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
