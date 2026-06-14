import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./profile.css";

export default function Profile() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-spinner" />
        <p>Loading profile…</p>
      </div>
    );
  }

  const initials = profile.fullname
    ? profile.fullname.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* ── Header banner + avatar ── */}
        <div className="profile-banner">
          <div className="profile-banner__bg" />
          <div className="profile-avatar-wrap">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.fullname}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar profile-avatar--initials">
                {initials}
              </div>
            )}
            <span className="profile-online-dot" title="Active" />
          </div>
        </div>

        {/* ── Identity ── */}
        <div className="profile-identity">
          <h1 className="profile-name">{profile.fullname}</h1>
          <span className="profile-role-badge">{profile.role}</span>
        </div>

        {/* ── Info grid ── */}
        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Email address</span>
            <span className="info-value">{profile.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Full name</span>
            <span className="info-value">{profile.fullname}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Account role</span>
            <span className="info-value" style={{ textTransform: "capitalize" }}>
              {profile.role}
            </span>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="profile-actions">
          <button className="profile-btn profile-btn--logout" onClick={logout}>
            <svg className="profile-btn__icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z" clipRule="evenodd" />
            </svg>
            Sign out
          </button>
        </div>

      </div>
    </div>
  );
}