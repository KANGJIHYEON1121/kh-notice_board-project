import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        &copy; {new Date().getFullYear()} My Diary Project. All rights reserved.
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        Designed &amp; Developed by Kang Jihyeon
      </div>
    </footer>
  );
};

export default Footer;
