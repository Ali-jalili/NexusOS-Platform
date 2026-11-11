/** @format */

import { useState, useRef, useEffect } from "react";
import {
  FaCode,
  FaBars,
  FaChevronLeft,
  FaChevronDown,
  FaRocket,
  FaUserTie,
} from "react-icons/fa";
import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const roleRoute = {
  admin: { to: "/app/admin", label: "Dashboard", badge: "Admin" },
  client: { to: "/client-dashboard", label: "My Projects", badge: "Client" },
  developer: { to: "/dev-dashboard", label: "My Tasks", badge: "Developer" },
};

function Header({ showSidebarToggle = false, onToggleSidebar, isSidebarOpen }) {
  const { role, user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleExit() {
    await handleLogout();
    navigate("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        {showSidebarToggle && (
          <button
            className={styles.sidebarToggle}
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaBars />}
          </button>
        )}
        <FaCode className={styles.logoIcon} />
        <Link to="/" className={styles.title}>
          Nexus Agency OS
        </Link>
      </div>

      {user && role && (
        <div className={styles.actions}>
          <NavLink to={roleRoute[role].to} className={styles.link}>
            {roleRoute[role].label}
          </NavLink>

          <div className={styles.userMenu}>
            <span className={`${styles.roleBadge} ${styles[`role_${role}`]}`}>
              {roleRoute[role].badge}
            </span>
            <span
              className={styles.avatar}
              aria-label={`Signed in as ${user?.email ?? "user"}`}
            >
              {(user?.email ?? "?").charAt(0).toUpperCase()}
            </span>
            <button className={styles.logoutBtn} onClick={handleExit}>
              Logout
            </button>
          </div>
        </div>
      )}

      {!user && (
        <div className={styles.actions} ref={menuRef}>
          <div className={styles.getStarted}>
            <button
              type="button"
              className={styles.getStartedToggle}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              Get Started
              <FaChevronDown
                className={`${styles.getStartedChevron} ${menuOpen ? styles.open : ""}`}
              />
            </button>
            {menuOpen && (
              <div className={styles.getStartedMenu} role="menu">
                <Link
                  to="/signup/client"
                  className={styles.getStartedItem}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaRocket className={styles.getStartedItemIcon} />
                  <span>
                    <strong>Start a Project</strong>
                    <small>For clients &amp; agencies</small>
                  </span>
                </Link>
                <Link
                  to="/signup/developer"
                  className={styles.getStartedItem}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUserTie className={styles.getStartedItemIcon} />
                  <span>
                    <strong>Join as a Developer</strong>
                    <small>Submit your resume</small>
                  </span>
                </Link>
              </div>
            )}
          </div>
          <NavLink to="/login" className={styles.link}>
            Login
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
