import { useContext } from "react";
import styles from "./Gallery.module.css";
import ImageFilter from "./ImageFilter/ImageFilter";
import ImageList from "./ImageList/ImageList";
import { GalleryContext } from "../../context/GalleryContext";
import ImageView from "./ImageView/ImageView";

function Gallery() {
  const { selectedImage } = useContext(GalleryContext);

  return (
    <div className={styles.galleryBox}>
      <ImageFilter></ImageFilter>
      <ImageList show={selectedImage ? false : true} />
      <ImageView show={selectedImage ? true : false} />
    </div>
  );
}

export default Gallery;
