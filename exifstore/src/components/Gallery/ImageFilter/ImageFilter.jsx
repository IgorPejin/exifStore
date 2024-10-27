import styles from "./ImageFilter.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import dayjs from "dayjs";

function ImageFilter() {
  const [date, setDate] = useState(dayjs("2022-04-17"));
  const [isExifFilterOpen, setExifFilterOpen] = useState(false);

  return (
    <div className={styles.imageFilterBox}>
      <h1>Test title</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
        ></DesktopDatePicker>
      </LocalizationProvider>
      <ToggleButton
        value="check"
        selected={isExifFilterOpen}
        onChange={() => setExifFilterOpen((prevSelected) => !prevSelected)}
      >
        Show exif filters
      </ToggleButton>
    </div>
  );
}

export default ImageFilter;
