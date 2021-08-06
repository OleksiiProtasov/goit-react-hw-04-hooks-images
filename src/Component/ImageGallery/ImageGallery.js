import React from "react";
import style from "./style.Module.css";
import ImageGalleryItem from "../ImageGalleryItem";

const ImageGallery = ({ image, onClick }) => (
  <ul className={style.ImageGallery} onClick={onClick}>
    {image.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
);

export default ImageGallery;
