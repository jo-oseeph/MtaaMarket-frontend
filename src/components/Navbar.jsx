import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaSearch,
  FaTag,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaShieldAlt,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);
  const toggleDropdown = () => setDropdownOpen((v) => !v);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const firstName = user?.fullname?.split(" ")[0] ?? "";
  const initials = user?.fullname
    ? user.fullname.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "";

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

        {/* Centered nav links */}
        <nav className="navbar-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/items" className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}>
            <FaSearch /> Browse Items
          </NavLink>
          {user && (
            <NavLink to="/create-listing" className={({ isActive }) => `nav-link${isActive ? " nav-link--active" : ""}`}>
              <FaTag /> Sell
            </NavLink>
          )}
        </nav>

        {/* Right actions */}
        <div className="navbar-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn btn--ghost">Sign in</Link>
              <Link to="/register" className="btn btn--primary">Get started</Link>
            </>
          ) : (
            <div className="profile-dropdown" ref={dropdownRef}>
              <button
                className={`profile-trigger ${dropdownOpen ? "profile-trigger--open" : ""}`}
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
                aria-label="Account menu"
              >
                <div className="profile-trigger__avatar">{initials}</div>
                <span className="profile-trigger__name">{firstName}</span>
                <FaChevronDown className="profile-trigger__caret" />
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-header__name">{user.fullname}</p>
                    <p className="dropdown-header__email">{user.email}</p>
                  </div>

                  <div className="dropdown-divider" />

                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUserCircle /> My profile
                  </Link>

                  {user.role === "user" && (
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaTachometerAlt /> Dashboard
                    </Link>
                  )}

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaShieldAlt /> Admin panel
                    </Link>
                  )}

                  <div className="dropdown-divider" />

                  <button
                    className="dropdown-item dropdown-item--danger"
                    onClick={() => { logout(); setDropdownOpen(false); }}
                  >
                    <FaSignOutAlt /> Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar-drawer ${menuOpen ? "navbar-drawer--open" : ""}`}>
        <div className="drawer-links">
          <NavLink to="/" end className={({ isActive }) => `drawer-link${isActive ? " drawer-link--active" : ""}`} onClick={closeMenu}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/items" className={({ isActive }) => `drawer-link${isActive ? " drawer-link--active" : ""}`} onClick={closeMenu}>
            <FaSearch /> Browse Items
          </NavLink>
          {user && (
            <NavLink to="/create-listing" className={({ isActive }) => `drawer-link${isActive ? " drawer-link--active" : ""}`} onClick={closeMenu}>
              <FaTag /> Sell an item
            </NavLink>
          )}
          {user?.role === "user" && (
            <NavLink to="/dashboard" className={({ isActive }) => `drawer-link${isActive ? " drawer-link--active" : ""}`} onClick={closeMenu}>
              <FaTachometerAlt /> Dashboard
            </NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={({ isActive }) => `drawer-link${isActive ? " drawer-link--active" : ""}`} onClick={closeMenu}>
              <FaShieldAlt /> Admin panel
            </NavLink>
          )}
        </div>

        <div className="drawer-auth">
          {!user ? (
            <>
              <Link to="/login" className="drawer-btn drawer-btn--ghost" onClick={closeMenu}>
                <FaSignInAlt /> Sign in
              </Link>
              <Link to="/register" className="drawer-btn drawer-btn--primary" onClick={closeMenu}>
                <FaUserPlus /> Get started
              </Link>
            </>
          ) : (
            <>
              <div className="drawer-user">
                <div className="drawer-user__avatar">
                  {initials}
                </div>
                <div>
                  <p className="drawer-user__name">{user.fullname}</p>
                  <p className="drawer-user__email">{user.email}</p>
                </div>
              </div>
              <Link to="/profile" className="drawer-btn drawer-btn--ghost" onClick={closeMenu}>
                <FaUserCircle /> My profile
              </Link>
              <button
                className="drawer-btn drawer-btn--logout"
                onClick={() => { logout(); closeMenu(); }}
              >
                <FaSignOutAlt /> Sign out
              </button>
            </>
          )}
        </div>
      </div>

      {menuOpen && <div className="navbar-backdrop" onClick={closeMenu} />}
    </header>
  );
}