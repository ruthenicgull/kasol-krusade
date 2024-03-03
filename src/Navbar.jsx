import React from "react";
import styles from "./Navbar.module.css";

function Navbar({ bookingScrollHandler }) {
  return (
    <nav className={styles.container}>
      <img className={styles.icon} src="" alt="icon" />
      <ul className={styles.menu}>
        <li>Details</li>
        <li onClick={bookingScrollHandler}>Booking</li>
        <li>FAQ</li>
      </ul>
      <div className={styles.hamburger}>burger</div>
    </nav>
  );
}

export default Navbar;
