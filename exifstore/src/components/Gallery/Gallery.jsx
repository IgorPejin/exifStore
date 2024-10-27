import styles from "./Gallery.module.css";
import ImageFilter from "./ImageFilter/ImageFilter";
import ImageList from "./ImageList/ImageList";

function Gallery() {
  return (
    <div className={styles.galleryBox}>
      <ImageFilter></ImageFilter>
      <ImageList></ImageList>
    </div>
  );
}

export default Gallery;
