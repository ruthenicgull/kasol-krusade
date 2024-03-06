import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import styles from "./Gallery.module.css";
import imageData from "./gallery.json";

export default function Gallery() {
  const [itemData, setItemData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(0);

  useEffect(() => {
    setItemData(imageData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setIsSmallScreen(2);
      } else if (window.innerWidth <= 1000) {
        setIsSmallScreen(1);
      } else setIsSmallScreen(0);
      // setIsSmallScreen(window.innerWidth <= 700);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ImageList
      sx={{
        height: "60vh",
        margin: "0 auto",
        borderRadius: "0.5rem",
      }}
      className={styles.image_list}
      cols={isSmallScreen == 2 ? 1 : isSmallScreen == 1 ? 2 : 3}
      rowHeight={164}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            // srcSet={`${item.img}`}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
          {/* <ImageListItemBar
            title={item.title}
            sx={{
              fontFamily: "var(--primary-font)",
            }}
          /> */}
        </ImageListItem>
      ))}
    </ImageList>
  );
}
