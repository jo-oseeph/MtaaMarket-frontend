import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const closeMenu = () =>
    setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link
          to="/"
          className="logo"
        >
          MtaaMarket
        </Link>

        <button
          className="menu-toggle"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

        <nav
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >

          <NavLink
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/items"
            onClick={closeMenu}
          >
            Browse Items
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={closeMenu}
            >
              Admin
            </NavLink>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="mobile-login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="mobile-register"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="mobile-profile"
                onClick={closeMenu}
              >
                <FaUserCircle />
                {user.fullname?.split(" ")[0]}
              </Link>

              <button
                className="mobile-logout"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
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