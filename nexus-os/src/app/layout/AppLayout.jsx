/** @format */

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth > 768,
  );
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className={styles.layout}>
      <Header
        showSidebarToggle={true}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={sidebarOpen}
      />
      <div className={styles.main}>
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          onClose={closeSidebar}
          onToggle={toggleSidebar}
        />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

      {isMobile && sidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} />
      )}
    </div>
  );
}

export default AppLayout;
