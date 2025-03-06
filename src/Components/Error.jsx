// src/components/NotFoundPage.js
import React from "react";

const NotFoundPage = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.textContainer}>
        <h1 style={styles.heading}>404</h1>
        <p style={styles.subheading}>Page Not Found</p>
        <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
        <a href="/" style={styles.button}>
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  textContainer: {
    textAlign: "center",
    
  },
  heading: {
    fontSize: "6rem",
    fontWeight: "bold",
    color: "blue",
  },
  subheading: {
    fontSize: "2rem",
    color: "#4a5568",
    marginTop: "1rem",
  },
  message: {
    fontSize: "1.125rem",
    color: "#6b7280",
    marginTop: "1rem",
  },
  button: {
    marginTop: "1.5rem",
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3182ce",
    color: "white",
    borderRadius: "0.375rem",
    textDecoration: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
};

export default NotFoundPage;