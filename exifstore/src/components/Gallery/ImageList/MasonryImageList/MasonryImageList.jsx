import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import { GalleryContext } from "../../../../context/GalleryContext";
import { useContext } from "react";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import styles from "./MasonryImageList.module.css";

export default function MasonryImageList() {
  const { imagesForGallery } = useContext(GalleryContext);
  const images = [...imagesForGallery];

  // const Image = ({ data }) => (
  //   <div style={{ objectFit: "cover" }}>
  //     <img
  //     loading=""
  //       width={"100%"}
  //       height={"100%"}
  //       src={`data:image/jpeg;base64,${data}`}
  //     />
  //   </div>
  // );

  return (
    <Box
      sx={{
        width: "95%",
        height: 750,
        overflowY: "scroll",
        marginTop: "0.5rem",
      }}
    >
      <ImageList sx={{ padding: "0 1rem" }} variant="masonry" cols={3} gap={20}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img
              className={styles.image}
              loading="lazy"
              src={`data:image/jpeg;base64,${image.base64_image}`}
            />
            <ImageListItemBar title={image.image_name} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
