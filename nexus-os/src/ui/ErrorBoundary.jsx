/** @format */

import { Component } from "react";

import styles from "./ErrorBoundary.module.css";

/**
 * Catches render-time errors anywhere in the tree it wraps and shows a
 * graceful, theme-consistent fallback instead of a blank screen.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Surface to console (and a monitoring service once one is wired up).
    console.error("Unhandled error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.overlay} role="alert">
          <div className={styles.card}>
            <div className={styles.icon}>⚠️</div>
            <h1 className={styles.title}>Something went wrong</h1>
            <p className={styles.message}>
              An unexpected error occurred while rendering this page.
            </p>
            <button
              type="button"
              className={styles.reloadBtn}
              onClick={this.handleReload}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
