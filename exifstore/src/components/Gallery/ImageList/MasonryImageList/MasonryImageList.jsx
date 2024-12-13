import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import { GalleryContext } from "../../../../context/GalleryContext";
import { useContext } from "react";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import styles from "./MasonryImageList.module.css";
import { AuthContext } from "../../../../context/AuthContext";

export default function MasonryImageList() {
  const { imagesForGallery, setSelectedImage } = useContext(GalleryContext);
  const { username } = useContext(AuthContext);
  const images = [...imagesForGallery];

  function handleClick(image) {
    setSelectedImage(image);
  }

  return (
    <Box
      sx={{
        width: "95%",
        height: 750,
        overflowY: "scroll",
        marginTop: "0.5rem",
      }}
    >
      <ImageList sx={{ padding: "1.5rem" }} variant="masonry" cols={3} gap={25}>
        {images.map((image) => (
          <ImageListItem
            className={styles.image}
            onClick={() => handleClick(image)}
            key={image.id}
          >
            <img
              // width="100%"
              // height="100%"
              loading="lazy"
              src={`data:image/jpeg;base64,${image.image_buffer}`}
            />
            <ImageListItemBar
              title={image.image_name}
              subtitle={"@  " + username}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
