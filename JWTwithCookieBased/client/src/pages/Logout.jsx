
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../api/auth";

export default function Logout() {
    const navigate = useNavigate();
    const [currentMail, setCurrentMail] = useState("");
    const [alert, setAlert] = useState("");

    // Fetch current user info — the httpOnly cookie is sent automatically
    useEffect(() => {
        authAPI.getProfile()
            .then((res) => setCurrentMail(res.data.user.email))
            .catch(() => setAlert("Not logged in."));
    }, []);

    async function handleLogout() {
        try {
            // Browser sends the httpOnly cookie automatically — no need to check document.cookie
            const response = await authAPI.logout();
            if (response.status === 200) {
                setAlert("Logged out successfully.");
                setCurrentMail("");
                navigate("/login");
            }
        } catch (error) {
            setAlert("Logout failed. Please try again.");
        }
    }

    return (
        <div>
            <h1>Logout</h1>
            {alert && <p style={{ color: "red" }}>{alert}</p>}
            <h3>Currently logged in with: {currentMail || "—"}</h3>
            {/* Note: document.cookie is always empty for httpOnly cookies — 
                the browser sends them automatically but JS can never read them */}
            <button onClick={handleLogout}>Logout here</button>
        </div>
    );
}