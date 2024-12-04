import styles from "./ImageFilter.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useContext } from "react";
import { Button } from "@mui/material";

import { GalleryContext } from "../../../context/GalleryContext";
import { FilterContext } from "../../../context/FilterContext";

function ImageFilter() {
  const { selectedGallery } = useContext(GalleryContext);
  const { updateFilter, filter } = useContext(FilterContext);

  function handleChange(newValue) {
    updateFilter("date", newValue);
  }

  return (
    <div className={styles.imageFilterBox}>
      <h1 style={{ fontWeight: 400 }}>
        {selectedGallery ? selectedGallery.name : "Choose gallery"}
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={filter.date}
          onChange={(newValue) => handleChange(newValue)}
        ></DesktopDatePicker>
      </LocalizationProvider>
      <Button variant="contained" size="large" sx={{ backgroundColor: "#55B" }}>
        Show advanced filters
      </Button>
    </div>
  );
}

export default ImageFilter;
