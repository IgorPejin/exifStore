import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import { GalleryContext } from "../../../../context/GalleryContext";
import { useContext, useEffect, useRef, useState } from "react";
import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./MasonryImageList.module.css";
import { AuthContext } from "../../../../context/AuthContext";
import axiosCall from "../../../../utils/axiosCall";
import { FilterContext } from "../../../../context/FilterContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export default function MasonryImageList() {
  const { username } = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  const { setRefresh } = useContext(FilterContext);

  const { imagesForGallery, setSelectedImage, setShowPagination } =
    useContext(GalleryContext);
  const images = [...imagesForGallery];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false); // Controls fade-in animation

  const lastImageRef = useRef(null);

  useEffect(() => {
    const target = lastImageRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowPagination(true);
        } else {
          setShowPagination(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [images.length, setShowPagination]);

  useEffect(() => {
    if (loadedCount === images.length && images.length > 0) {
      setAllLoaded(true);
      setTimeout(() => setShouldFadeIn(true), 10); // Start fade-in after a tiny delay
    }
  }, [loadedCount, images.length]);

  function handleClick(image) {
    setSelectedImage(image);
  }

  function handleAddToGallery(image) {
    console.log(image);
  }

  async function handleDelete(image) {
    console.log(image);
    if (
      confirm(
        "Are you sure you want to delete image " + image.image_name + "?"
      ) === true
    ) {
      const response = await axiosCall(
        "delete",
        `http://localhost:7000/exifstore/imageDelete?id=${image.id}&name=${image.image_name}`,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.status === 200) {
        setRefresh(true); // todo: this will be removed when history component gets added
      }
      console.log(response);
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
      <ImageList
        sx={{
          padding: "1.5rem",
          pointerEvents: allLoaded ? "auto" : "none",
          opacity: shouldFadeIn ? 1 : 0, // Always starts from 0
          transition: shouldFadeIn ? "opacity 0.5s ease-in" : "none",
        }}
        variant="masonry"
        cols={5}
        gap={20}
      >
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
              ref={index === images.length - 1 ? lastImageRef : null}
              onLoad={() => setLoadedCount((count) => count + 1)}
              onClick={() => handleClick(image)}
              src={`data:image/jpeg;base64,${image.image_thumbnail}`}
            />
            <ImageListItemBar
              title={image.image_name}
              subtitle={"@  " + username}
              sx={{
                "& .MuiImageListItemBar-title": {
                  fontSize: "0.8rem",
                  margin: "0.2rem",
                },
                padding: "0",
                opacity: hoveredIndex === index ? 1 : 0,
                transition: "opacity 0.3s",
              }}
              actionIcon={
                <>
                  <Tooltip title="Add to gallery" placement="top" arrow>
                    <IconButton
                      onClick={() => handleAddToGallery(image)}
                      size="small"
                      sx={{
                        visibility: "hidden",
                        color: "rgba(255, 255, 255, 0.54)",
                        "&:hover": { color: "#55b", transform: "scale(1.2)" },
                      }}
                    >
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(image)}
                      sx={{
                        color: "rgba(255, 255, 255, 0.54)",
                        "&:hover": { color: "coral", transform: "scale(1.2)" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
