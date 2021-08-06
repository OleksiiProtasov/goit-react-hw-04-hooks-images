import React from "react";
import style from "./style.module.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => (
  <li className={style.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt=""
      data-img={largeImageURL}
      className={style.ImageGalleryItem__image}
    />
  </li>
);

export default ImageGalleryItem;
