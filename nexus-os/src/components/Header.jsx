/** @format */

import { useState, useRef, useEffect } from "react";
import {
  FaCode,
  FaBars,
  FaChevronLeft,
  FaChevronDown,
  FaHome,
  FaRocket,
  FaUserTie,
} from "react-icons/fa";
import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const roleRoute = {
  admin: { to: "/app/admin", label: "Dashboard", badge: "Admin" },
  client: { to: "/client-dashboard", label: "Dashboard", badge: "Client" },
  developer: { to: "/dev-dashboard", label: "Dashboard", badge: "Developer" },
};

function Header({ showSidebarToggle = false, onToggleSidebar, isSidebarOpen }) {
  const { role, user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleExit() {
    setUserMenuOpen(false);
    await handleLogout();
    toast.success("You've been logged out.");
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

      {user && roleRoute[role] && (
        <div className={styles.actions}>
          <NavLink
            to={roleRoute[role].to}
            className={`${styles.link} ${styles.dashboardLink}`}
            aria-label={`Go to ${roleRoute[role].badge} dashboard`}
          >
            <FaHome aria-hidden="true" />
            {roleRoute[role].label}
          </NavLink>

          <div className={styles.userMenu} ref={userMenuRef}>
            <button
              type="button"
              className={styles.avatarButton}
              onClick={() => setUserMenuOpen((prev) => !prev)}
              aria-label="Open account menu"
              aria-expanded={userMenuOpen}
              aria-haspopup="menu"
            >
              <span className={styles.avatar} aria-hidden="true">
                {(user?.email ?? "?").charAt(0).toUpperCase()}
              </span>
              <FaChevronDown
                className={`${styles.accountChevron} ${userMenuOpen ? styles.open : ""}`}
              />
            </button>
            {userMenuOpen && (
              <div className={styles.accountMenu} role="menu">
                <span className={styles.accountEmail}>{user?.email}</span>
                <span className={`${styles.roleBadge} ${styles[`role_${role}`]}`}>
                  {roleRoute[role].badge}
                </span>
                <button
                  className={styles.accountLogout}
                  onClick={handleExit}
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            )}
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
