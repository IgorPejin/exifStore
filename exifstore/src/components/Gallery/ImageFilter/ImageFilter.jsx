import styles from "./ImageFilter.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useContext, useState } from "react";
import { Button } from "@mui/material";

import { GalleryContext } from "../../../context/GalleryContext";
import { FilterContext } from "../../../context/FilterContext";
import ImageFilterBox from "./ImageFilterBox/ImageFilterBox";

function ImageFilter() {
  const { selectedGallery } = useContext(GalleryContext);
  const { updateFilter, filter } = useContext(FilterContext);

  const [showFilters, setShowFilters] = useState(false);

  function handleShowFilters() {
    setShowFilters(!showFilters);
  }

  function handleChange(newValue) {
    updateFilter("date_time", newValue);
  }

  return (
    <div className={styles.imageFilterWrapper}>
      <h1 style={{ fontWeight: 400 }}>
        {selectedGallery ? selectedGallery.name : "Choose gallery"}
      </h1>
      <div className={styles.imageFilterBoxWrapper}>
        <div className={styles.filterBox}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              sx={{ backgroundColor: "whitesmoke" }}
              value={filter.date}
              onChange={(newValue) => handleChange(newValue)}
            ></DesktopDatePicker>
          </LocalizationProvider>
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
