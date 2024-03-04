import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import styles from "./Gallery.module.css";
import imageData from "./gallery.json";

export default function Gallery() {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    setItemData(imageData);
  }, []);

  return (
    <ImageList
      sx={{
        maxWidth: "40rem",
        height: "60vh",
        margin: "0 auto",
        borderRadius: "0.5rem",
      }}
      className={styles.image_list}
      cols={3}
      rowHeight={164}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            sx={{
              fontFamily: "var(--primary-font)",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
