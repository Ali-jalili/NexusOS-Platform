/** @format */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const { role, user, handleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (role === "admin") navigate("/app/admin");
    else if (role === "client") navigate("/client-dashboard");
    else if (role === "developer") navigate("/dev-dashboard");
    else navigate("/");
  }, [user, role, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setShake(false);

    try {
      await handleLogin(email, password);
    } catch {
      toast.error("Invalid email or password");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form
        className={`${styles.form} ${shake ? styles.shake : ""}`}
        onSubmit={handleSubmit}
      >
        <h1 className={styles.heading}>Welcome back</h1>
        <p className={styles.subtitle}>Log in to your account</p>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
        </div>

        <button className={styles.submitBtn} type="submit" disabled={isLoading}>
          {isLoading ? <FaSpinner className={styles.spinner} /> : "Log In"}
        </button>

        <div className={styles.forgotWrapper}>
          <button
            type="button"
            className={styles.forgotLink}
            onClick={() =>
              toast("Please contact admin to reset your password.")
            }
          >
            Forgot Password?
          </button>
        </div>

        <div className={styles.demoHint}>
          <strong>Demo admin:</strong> admin@nexus.com / admin123
        </div>

        <p className={styles.footerText}>
          Don&apos;t have an account?{" "}
          <Link to="/signup/client" className={styles.link}>
            Sign up as a client
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
