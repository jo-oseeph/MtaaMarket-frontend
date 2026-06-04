import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

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
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <img
        src={
          profile.profileImage ||
          "https://via.placeholder.com/120"
        }
        alt="Profile"
        width="120"
      />

      <p>
        <strong>Name:</strong>{" "}
        {profile.fullname}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {profile.email}
      </p>

      <p>
        <strong>Role:</strong>{" "}
        {profile.role}
      </p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}