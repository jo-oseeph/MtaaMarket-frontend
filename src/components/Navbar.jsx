import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaShieldAlt,
  FaHome,
  FaSearch,
  FaTag,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="navbar-logo__icon">M</span>
          <span className="navbar-logo__text">
            Mtaa<strong>Market</strong>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            <FaSearch /> Browse
          </NavLink>
          {user?.role === "user" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              <FaShieldAlt /> Admin
            </NavLink>
          )}
        </nav>

        {/* Desktop auth actions */}
        <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn btn--ghost">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/register" className="btn btn--primary">
                <FaUserPlus /> Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/create-listing" className="btn btn--sell">
                <FaTag /> Sell Item
              </Link>
              <Link to="/profile" className="btn btn--user">
                <FaUserCircle />
                <span>{user.fullname?.split(" ")[0]}</span>
              </Link>
              <button className="btn btn--logout" onClick={logout}>
                <FaSignOutAlt />
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar-drawer ${menuOpen ? "navbar-drawer--open" : ""}`}>
        <div className="drawer-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "drawer-link drawer-link--active" : "drawer-link"
            }
            onClick={closeMenu}
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) =>
              isActive ? "drawer-link drawer-link--active" : "drawer-link"
            }
            onClick={closeMenu}
          >
            <FaSearch /> Browse Items
          </NavLink>
          {user?.role === "user" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "drawer-link drawer-link--active" : "drawer-link"
              }
              onClick={closeMenu}
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "drawer-link drawer-link--active" : "drawer-link"
              }
              onClick={closeMenu}
            >
              <FaShieldAlt /> Admin
            </NavLink>
          )}
        </div>

        <div className="drawer-auth">
          {!user ? (
            <>
              <Link
                to="/login"
                className="drawer-btn drawer-btn--ghost"
                onClick={closeMenu}
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/register"
                className="drawer-btn drawer-btn--primary"
                onClick={closeMenu}
              >
                <FaUserPlus /> Create Account
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/create-listing"
                className="drawer-btn drawer-btn--sell"
                onClick={closeMenu}
              >
                <FaTag /> Sell an Item
              </Link>
              <Link
                to="/profile"
                className="drawer-btn drawer-btn--user"
                onClick={closeMenu}
              >
                <FaUserCircle /> {user.fullname?.split(" ")[0]}
              </Link>
              <button
                className="drawer-btn drawer-btn--logout"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="navbar-backdrop" onClick={closeMenu} />}
    </header>
  );
}
