import React from "react";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Logout from "../components/Logout.jsx";
import { navigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <button onClick={() => navigate("/profile")}>Go to Profile</button>
      <Logout />
      <ProtectedRoute>
        <h1>Protected Content</h1>
      </ProtectedRoute>
      <button onClick={() => navigate("/profile")}>Go to Profile</button>
    </div>
  );
}
