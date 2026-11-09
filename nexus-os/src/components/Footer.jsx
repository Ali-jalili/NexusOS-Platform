/** @format */

import { Link } from "react-router-dom";
import { FaGithub, FaEnvelope, FaCode } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <FaCode className={styles.logoIcon} />
            <span>Nexus Agency OS</span>
          </div>
          <p className={styles.tagline}>
            A modern agency management platform that turns ideas into products.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navigate</h4>
          <ul className={styles.list}>
            <li>
              <Link to="/" className={styles.item}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/request-project" className={styles.item}>
                Request a Project
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Platform</h4>
          <ul className={styles.list}>
            <li>
              <Link to="/signup/client" className={styles.item}>
                Start as a Client
              </Link>
            </li>
            <li>
              <Link to="/signup/developer" className={styles.item}>
                Join as a Developer
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Connect</h4>
          <ul className={styles.list}>
            <li>
              <a
                href="https://github.com/Ali-jalili/NexusOS-Platform"
                target="_blank"
                rel="noreferrer"
                className={styles.item}
              >
                <FaGithub /> GitHub
              </a>
            </li>
            <li>
              <a href="mailto:hello@nexus.com" className={styles.item}>
                <FaEnvelope /> hello@nexus.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bar}>
        <p className={styles.copy}>
          &copy; {currentYear} Nexus. Crafted with precision.
        </p>
        <span className={styles.version}>v1.0</span>
      </div>
    </footer>
  );
}

export default Footer;
