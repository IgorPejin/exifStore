import styles from "./ImageFilter.module.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";

function ImageFilter() {
  const [date, setDate] = useState(dayjs("2022-04-17"));

  return (
    <div className={styles.imageFilterBox}>
      <h1 style={{ fontWeight: 400 }}>Test title</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
        ></DesktopDatePicker>
      </LocalizationProvider>
      <Button variant="contained" size="large" sx={{ backgroundColor: "#55B" }}>
        Show exif filters
      </Button>
    </div>
  );
}

export default ImageFilter;
