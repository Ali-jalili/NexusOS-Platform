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

      {role === "admin" && (
        <div className={styles.actions}>
          <NavLink to="/app/admin" className={styles.link}>
            Dashboard
          </NavLink>
          <button className={styles.logoutBtn} onClick={handleExit}>
            Logout
          </button>
        </div>
      )}

      {role === "developer" && (
        <div className={styles.actions}>
          <NavLink to="/dev-dashboard" className={styles.link}>
            My Tasks
          </NavLink>
          <button className={styles.logoutBtn} onClick={handleExit}>
            Logout
          </button>
        </div>
      )}

      {role === "client" && (
        <div className={styles.actions}>
          <NavLink to="/client-dashboard" className={styles.link}>
            My Projects
          </NavLink>
          <button className={styles.logoutBtn} onClick={handleExit}>
            Logout
          </button>
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
