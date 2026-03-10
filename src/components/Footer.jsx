import React from "react";

const Footer = () => {
  return (
    <footer style={{
      width: "100%",
      padding: "20px 0",
      backgroundColor: "#111",
      color: "#fff",
      textAlign: "center"
    }}>
      <div style={{ marginBottom: "10px" }}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        >
          Instagram
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        >
          GitHub
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 15px", color: "#fff", textDecoration: "none" }}
        >
          Facebook
        </a>
      </div>

      <div style={{ fontSize: "14px", opacity: 0.7 }}>
        © 2026 All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
