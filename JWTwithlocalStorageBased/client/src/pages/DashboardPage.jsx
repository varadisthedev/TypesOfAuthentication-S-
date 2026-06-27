import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateHobbies } from "../api/auth";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Hobbies form state
  const [hobbies, setHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: "", text: "" });

  // ─── Load profile on mount ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data.user);
        setHobbies(data.user.hobbies || []);
      } catch {
        // verifyJWT returned 401 → axiosInstance redirects to /login automatically
      } finally {
        setPageLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ─── Logout ─────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ─── Hobby helpers ───────────────────────────────────────────────────────────
  const addHobby = () => {
    const trimmed = hobbyInput.trim();
    if (!trimmed || hobbies.includes(trimmed)) return;
    setHobbies((prev) => [...prev, trimmed]);
    setHobbyInput("");
  };

  const removeHobby = (hobby) => {
    setHobbies((prev) => prev.filter((h) => h !== hobby));
  };

  const handleHobbyKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addHobby();
    }
  };

  // ─── Save hobbies ────────────────────────────────────────────────────────────
  const handleSaveHobbies = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setSaveMessage({ type: "", text: "" });

    try {
      const { data } = await updateHobbies(hobbies);
      setUser(data.user);
      setHobbies(data.user.hobbies);
      setSaveMessage({ type: "success", text: "Hobbies saved successfully!" });
    } catch (err) {
      setSaveMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save hobbies.",
      });
    } finally {
      setSaveLoading(false);
      // Auto-clear message after 3 seconds
      setTimeout(() => setSaveMessage({ type: "", text: "" }), 3000);
    }
  };

  // ─── Loading state ───────────────────────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className="spinner-page">
        <div className="spinner" />
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header__brand">
          <div className="dashboard-header__dot" />
          <span className="dashboard-header__title">JWT Auth</span>
        </div>
        <div className="dashboard-header__actions">
          <span className="dashboard-header__user">
            Hey, {user?.name?.split(" ")[0]} 👋
          </span>
          <button id="logout-btn" className="btn btn-ghost" style={{ width: "auto", padding: "7px 16px" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Profile Card */}
        <div className="card">
          <div className="card__header">
            <div className="card__icon">👤</div>
            <div>
              <div className="card__title">Profile</div>
              <div className="card__subtitle">Your account information</div>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <div className="profile-field__label">Full name</div>
              <div className="profile-field__value">{user?.name}</div>
            </div>
            <div className="profile-field">
              <div className="profile-field__label">Email</div>
              <div className="profile-field__value">{user?.email}</div>
            </div>
            <div className="profile-field">
              <div className="profile-field__label">Member since</div>
              <div className="profile-field__value">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </div>
            </div>
            <div className="profile-field">
              <div className="profile-field__label">Hobbies</div>
              <div className="profile-field__value">{hobbies.length} added</div>
            </div>
          </div>
        </div>

        {/* Hobbies Card */}
        <div className="card">
          <div className="card__header">
            <div className="card__icon">🎯</div>
            <div>
              <div className="card__title">Hobbies</div>
              <div className="card__subtitle">Tell us what you enjoy</div>
            </div>
          </div>

          {/* Alert */}
          {saveMessage.text && (
            <div className={`alert alert-${saveMessage.type}`}>{saveMessage.text}</div>
          )}

          <form onSubmit={handleSaveHobbies}>
            {/* Input row */}
            <div className="hobbies-input-row">
              <input
                id="hobby-input"
                className="form-input"
                type="text"
                placeholder="e.g. Photography, Hiking, Chess…"
                value={hobbyInput}
                onChange={(e) => setHobbyInput(e.target.value)}
                onKeyDown={handleHobbyKeyDown}
              />
              <button
                id="add-hobby-btn"
                type="button"
                className="btn btn-ghost"
                onClick={addHobby}
              >
                + Add
              </button>
            </div>

            {/* Tags */}
            <div className="hobby-tags">
              {hobbies.length === 0 ? (
                <span className="hobbies-empty">No hobbies added yet</span>
              ) : (
                hobbies.map((hobby) => (
                  <span key={hobby} className="hobby-tag">
                    {hobby}
                    <button
                      type="button"
                      className="hobby-tag__remove"
                      onClick={() => removeHobby(hobby)}
                      aria-label={`Remove ${hobby}`}
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>

            <button id="save-hobbies-btn" className="btn btn-primary" type="submit" disabled={saveLoading}>
              {saveLoading ? "Saving…" : "Save hobbies"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
