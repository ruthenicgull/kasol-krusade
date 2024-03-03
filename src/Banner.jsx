import React from "react";
import styles from "./Banner.module.css";

function Banner({ bookingScrollHandler }) {
  return (
    <div className={styles.container}>
      <div className={styles.hero_content}>
        <h1 className={styles.hero_title}>Kasol Krusade</h1>
        <p className={styles.hero_text}>
          Trek, Trippin', and Tons of Memories!
        </p>
        <button className={styles.button} onClick={bookingScrollHandler}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
