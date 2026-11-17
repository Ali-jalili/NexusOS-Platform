/** @format */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import styles from "./SignupClientPage.module.css";
import { signupClient } from "../../services/authService";

function SignupClientPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
      setIsLoading(false);
      return toast.error("Please fill in all fields.");
    }
    if (password.length < 6) {
      setIsLoading(false);
      return toast.error("Password must be at least 6 characters.");
    }

    const { error } = await signupClient({ name, email, password });
    if (error) {
      setIsLoading(false);
      toast.error(error.message);
      return;
    }

    setIsLoading(false);
    toast.success("Account created successfully!");
    navigate("/client-dashboard");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>Create Your Account</h1>

      <div className={styles.field}>
        <label htmlFor="clientName">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="clientName"
          placeholder="John Doe"
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="clientEmail">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="clientEmail"
          placeholder="john@example.com"
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="clientPassword">Password</label>
        <div className={styles.passwordWrapper}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            id="clientPassword"
            placeholder="Min. 6 characters"
            disabled={isLoading}
            autoComplete="new-password"
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            disabled={isLoading}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <button className={styles.submitBtn} type="submit" disabled={isLoading}>
        {isLoading ? (
          <FaSpinner className={styles.spinner} />
        ) : (
          "Create Account"
        )}
      </button>

      <p className={styles.footerText}>
        Already have an account?{" "}
        <Link to="/login" className={styles.link}>
          Log in
        </Link>
      </p>
    </form>
  );
}

export default SignupClientPage;
