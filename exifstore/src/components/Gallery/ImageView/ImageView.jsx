import { useContext } from "react";
import styles from "./ImageView.module.css";
import { GalleryContext } from "../../../context/GalleryContext";
import { IconButton } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";

function ImageView({ show }) {
  const { selectedImage, setSelectedImage } = useContext(GalleryContext);

  function handleBackButton() {
    setSelectedImage(null);
  }

  function handleClick() {
    // const image = e.target;
    // const src = image.src;
    // window.open(src, "_blank");
  }

  return (
    <div
      style={show ? {} : { display: "none" }}
      className={styles.imageViewBox}
    >
      <IconButton
        onClick={handleBackButton}
        sx={{
          position: "absolute",
          top: "1%",
          left: "1%",
          transition: "all 0.1s ease-in ",
          ":hover": { color: "white" },
        }}
        aria-label="delete"
      >
        <UndoIcon />
      </IconButton>
      <div className={styles.imageInfoWrapper}>
        {selectedImage && (
          <>
            <img
              onClick={handleClick}
              className={styles.imageBox}
              loading="lazy"
              src={`data:image/jpeg;base64,${selectedImage.image_buffer}`}
            />

            <div className={styles.imageInfoBox}>
              <h2 className={styles.imageInfoTitle}>
                {selectedImage.image_name}
              </h2>
              <p>
                Width: {selectedImage.image_width} &nbsp;&nbsp;
                <br />
                <br />
                Height: {selectedImage.image_height}&nbsp;&nbsp;
              </p>
              <p>
                Manufacturer: {selectedImage.make}
                <br />
                <br />
                Model: {selectedImage.model}
              </p>
              <p>
                EV: {selectedImage.ev} &nbsp;&nbsp;
                <br />
                ISO: {selectedImage.iso}&nbsp;&nbsp;
                <br />
                Exposure time: {selectedImage.exposure_time} &nbsp;&nbsp;
                <br />F number: {selectedImage.f_number}&nbsp;&nbsp;
              </p>
              <p>
                Date: {selectedImage.date_time}
                <br />
                <br />
                Flash: {selectedImage.flash}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageView;
