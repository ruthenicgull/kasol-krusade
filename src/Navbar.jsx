import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Navbar({
  bookingScrollHandler,
  faqsScrollHandler,
  detailsScrollHandler,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 500);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for screen size
    handleResize();

    // Cleanup function for event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={styles.container}>
      <img className={styles.icon} src="/kasolkrusadelogo.png" alt="icon" />
      <ul className={`${styles.menu} ${menuOpen ? styles.active : ""}`}>
        <li onClick={detailsScrollHandler}>Details</li>
        <li onClick={bookingScrollHandler}>Booking</li>
        <li onClick={faqsScrollHandler}>FAQ</li>
      </ul>
      {isSmallScreen && ( // Render only on small screens
        <>
          {menuOpen ? (
            <CloseIcon
              onClick={handleMenuClick}
              className={`${styles.menuIcon} ${styles.closeIcon}`}
            />
          ) : (
            <MenuIcon
              onClick={handleMenuClick}
              className={styles.menuIcon}
            />
          )}
        </>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  bookingScrollHandler: PropTypes.func.isRequired,
  faqsScrollHandler: PropTypes.func.isRequired,
  detailsScrollHandler: PropTypes.func.isRequired,
};

export default Navbar;
