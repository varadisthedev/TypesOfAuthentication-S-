import React from "react";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Logout from "../components/Logout.jsx";
import { navigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      Dashboard
      <button
        onClick={() => navigate("/profile")}
        className="border p-2 bg-blue-500 text-white rounded-md mt-4"
      >
        Go to Profile
      </button>
      <Logout />
      <ProtectedRoute>
        <h1>Protected Content</h1>
      </ProtectedRoute>
      <button
        onClick={() => navigate("/profile")}
        className="border p-2 bg-gray-500 text-white rounded-md mt-4"
      >
        Go to Profile
      </button>
    </div>
  );
}
