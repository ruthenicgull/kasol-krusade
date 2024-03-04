import React from "react";
import styles from "./Banner.module.css";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

function Banner({ bookingScrollHandler }) {
  return (
    <div className={styles.container}>
      <div className={styles.hero_content}>
        <h1 className={styles.hero_title}>Kasol Krusade</h1>
        <p className={styles.hero_text}>
          Trek, Trippin', and Tons of Memories!
        </p>
        <p className={`${styles.hero_item} ${styles.hero_date}`}>
          <DateRangeIcon />
          <p>
            <span>27 March 2024</span> - <span>1 April 2024</span>
          </p>
        </p>
        <p className={`${styles.hero_item} ${styles.hero_deadline}`}>
          <PendingActionsIcon />
          <p>
            Book Before <strong>18 March</strong>
          </p>
        </p>
        <button className={styles.button} onClick={bookingScrollHandler}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
