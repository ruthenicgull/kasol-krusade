import React from "react";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar({
  bookingScrollHandler,
  faqsScrollHandler,
  detailsScrollHandler,
}) {
  return (
    <nav className={styles.container}>
      <img className={styles.icon} src="/kasolkrusadelogo.png" alt="icon" />
      <ul className={styles.menu}>
        <li onClick={detailsScrollHandler}>Details</li>
        <li onClick={bookingScrollHandler}>Booking</li>
        <li onClick={faqsScrollHandler}>FAQ</li>
      </ul>
      <MenuIcon
        style={{
          color: "transparent",
        }}
      />
    </nav>
  );
}

export default Navbar;
