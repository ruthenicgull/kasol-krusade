import React from "react";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({ bookingScrollHandler }) {
  return (
    <nav className={styles.container}>
      <img className={styles.icon} src="/kasolkrusadelogo.png" alt="icon" />
      <ul className={styles.menu}>
        <li>Details</li>
        <li onClick={bookingScrollHandler}>Booking</li>
        <li>FAQ</li>
      </ul>
      <p>Contact</p>
    </nav>
  );
}

export default Navbar;
