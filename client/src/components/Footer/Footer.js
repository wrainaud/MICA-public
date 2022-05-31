import React from "react";
import "./Footer.css";

const Footer = () => (
  <div className="footer">
    <div>
      <a
        href="https://www.monmouth.edu"
        target="_blank"
        rel="noopener noreferrer"
      >
        {" "}
        Team Biergarten{" "}
      </a>{" "}
      © Copyright 2022
      <ul className="nav footer-links">
        <li>
          <a
            style={{ margin: 5 }}
            href="https://gitlab.com/mallas/teambiergarten/-/issues"
          >
            Issues
          </a>
        </li>
        <li>
          <a href="mailto:s0833836@monmouth.edu">Contact</a>
        </li>
      </ul>
    </div>
  </div>
);

export default Footer;
