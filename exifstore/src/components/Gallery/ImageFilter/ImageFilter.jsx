import styles from "./ImageFilter.module.css";

import { useContext, useState } from "react";
import { Button } from "@mui/material";

import { GalleryContext } from "../../../context/GalleryContext";
import ImageFilterBox from "./ImageFilterBox/ImageFilterBox";

function ImageFilter() {
  const { selectedGallery } = useContext(GalleryContext);

  const [showFilters, setShowFilters] = useState(false);

  function handleShowFilters() {
    setShowFilters(!showFilters);
  }

  return (
    <div className={styles.imageFilterWrapper}>
      <h1 style={{ fontWeight: 400 }}>
        {selectedGallery ? selectedGallery.name : "Choose gallery"}
      </h1>
      <div className={styles.imageFilterBoxWrapper}>
        <div className={styles.filterBox}>
          {showFilters && <ImageFilterBox />}

          <Button
            onClick={handleShowFilters}
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#55B" }}
          >
            Show filters
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageFilter;
