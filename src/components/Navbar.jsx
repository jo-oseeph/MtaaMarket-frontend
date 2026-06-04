import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!location.trim()) return;

    navigate(`/items?location=${encodeURIComponent(location)}`);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        MtaaMarket
      </div>

      {/* Search */}
      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by location (e.g Nairobi, Kilimani...)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Right section */}
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        ) : (
          <div className="user-menu">
            <span
              onClick={() => navigate("/profile")}
              className="avatar"
            >
              {user.fullname?.charAt(0) || "U"}
            </span>

            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}