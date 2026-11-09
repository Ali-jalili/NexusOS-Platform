/** @format */

import { Link } from "react-router-dom";
import { FaCode, FaBars, FaChevronLeft } from "react-icons/fa";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header({ showSidebarToggle = false, onToggleSidebar, isSidebarOpen }) {
  const { role, user, handleLogout } = useAuth();
  const navigate = useNavigate();

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
        <NavLink to="/login" className={styles.link}>
          Login
        </NavLink>
      )}
    </header>
  );
}

export default Header;
