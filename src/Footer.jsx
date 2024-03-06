import React from "react";
import styles from "./Footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.credits}>
        <p className={styles.credits_header}>Designed & Developed by</p>
        <p className={styles.credit}>Muhammed Hisham</p>
        <p className={styles.links}>
          {" "}
          <a href="https://github.com/ruthenicgull">
            <GitHubIcon fontSize="small" sx={{ cursor: "pointer" }} />
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
