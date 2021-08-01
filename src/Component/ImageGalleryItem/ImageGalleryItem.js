import React from "react";
import style from "./style.module.css";

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => (
  <li className={style.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      data-url={largeImageURL}
      className={style.ImageGalleryItem__image}
    />
  </li>
);

export default ImageGalleryItem;
