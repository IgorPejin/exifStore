import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import { GalleryContext } from "../../../../context/GalleryContext";
import { useContext, useState } from "react";
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./MasonryImageList.module.css";
import { AuthContext } from "../../../../context/AuthContext";

export default function MasonryImageList() {
  const { imagesForGallery, setSelectedImage } = useContext(GalleryContext);
  const { username } = useContext(AuthContext);
  const images = [...imagesForGallery];
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function handleClick(image) {
    setSelectedImage(image);
  }

  function handleDelete(image) {
    console.log(image);
    if (
      confirm(
        "Are you sure you want to delete image " + image.image_name + "?"
      ) === true
    ) {
      console.log("true");
    }
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
        {images.map((image, index) => (
          <ImageListItem
            className={styles.image}
            key={image.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            sx={{ position: "relative", cursor: "pointer" }}
          >
            <img
              // width="100%"
              // height="100%"
              onClick={() => handleClick(image)}
              loading="lazy"
              src={`data:image/jpeg;base64,${image.image_buffer}`}
            />
            <ImageListItemBar
              title={image.image_name}
              subtitle={"@  " + username}
              sx={{
                opacity: hoveredIndex === index ? 1 : 0,
                transition: "opacity 0.3s",
              }}
              actionIcon={
                <IconButton
                  onClick={() => handleDelete(image)}
                  sx={{
                    color: "rgba(255, 255, 255, 0.54)",
                    "&:hover": { color: "coral", transform: "scale(1.2)" },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
