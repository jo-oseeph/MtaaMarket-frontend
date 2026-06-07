import { Link, NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaShieldAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="logo"
        >
          MtaaMarket
        </Link>

        <nav className="nav-links">

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/items">
            Browse Items
          </NavLink>

          {user && (
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin">
              Admin
            </NavLink>
          )}

        </nav>

        <div className="nav-actions">

          {!user ? (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                <FaUserCircle />
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="profile-btn"
              >
                <FaUserCircle />

                {user.fullname?.split(" ")[0]}
              </Link>

              <button
                className="logout-btn"
                onClick={logout}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </header>
  );
}