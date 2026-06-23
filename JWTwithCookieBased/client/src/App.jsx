import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx"
import Logout from "./pages/Logout.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>main page here</h1>

      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/profile">Profile </Link> |{" "}
        <Link to="/dashboard">Dashboard </Link>|{" "}
        <Link to="/signup">signup  </Link>|{" "}
        <Link to="/logout">Logout  </Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <h1>Profile</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>Dashboard</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
