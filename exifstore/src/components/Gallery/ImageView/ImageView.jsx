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
              className={styles.imageBox}
              loading="lazy"
              src={`data:image/jpeg;base64,${selectedImage.image_buffer}`}
            />

            <div className={styles.imageInfoBox}>
              <h1>{selectedImage.image_name}</h1>
              <p>
                Width: {selectedImage.image_width}
                <br />
                Height: {selectedImage.image_height}
                <br /> <br />
                Manufacturer: {selectedImage.make}
                <br />
                Model: {selectedImage.model}
                <br /> <br />
                EV: {selectedImage.ev}
                <br />
                ISO: {selectedImage.iso}
                <br />
                Exposure time: {selectedImage.exposure_time}
                <br />F number: {selectedImage.f_number}
                <br /> <br />
                Date: {selectedImage.date_time}
                <br />
                Flash: {selectedImage.flash}
                <br />
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageView;
