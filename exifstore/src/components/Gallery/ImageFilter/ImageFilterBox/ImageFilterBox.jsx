import styles from "./ImageFilterBox.module.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useContext, useState } from "react";
import { FilterContext } from "../../../../context/FilterContext";

dayjs.extend(utc);

function ImageFilterBox() {
  const { setRefresh, resetFilters, updateFilter, filter } =
    useContext(FilterContext);

  const [ev, setEv] = useState("");
  const [exposureTime, setExposureTime] = useState("");
  const [iso, setIso] = useState("");
  const [fnumber, setFNumber] = useState("");

  function handleResetFilters() {
    setEv(null);
    setExposureTime(null);
    setIso(null);
    setFNumber(null);
    resetFilters();
    setRefresh(true);
  }

  function handleChange(newValue) {
    const date = newValue.$d.toISOString().split("T")[0];
    updateFilter("date_time", date);
  }

  function handleChangeEv(e) {
    const newValue = e.target.value;
    setEv(newValue);
  }
  function handleBlurEv() {
    updateFilter("ev", parseFloat(ev));
  }

  function handleChangeExposureTime(e) {
    const newValue = e.target.value;
    setExposureTime(newValue);
  }

  function handleBlurExposureTime() {
    updateFilter("exposure_time", parseFloat(exposureTime));
  }

  function handleChangeIso(e) {
    const newValue = e.target.value;
    setIso(newValue);
  }

  function handleBlurIso() {
    updateFilter("iso", parseInt(iso));
  }

  function handleChangeFNumber(e) {
    const newValue = e.target.value;
    setFNumber(newValue);
  }

  function handleBlurFNumber() {
    updateFilter("f_number", parseFloat(fnumber));
  }

  return (
    <div className={styles.imageFilterBox}>
      <FormControlLabel control={<Checkbox />} label="Flash" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          timezone="UTC"
          sx={{ backgroundColor: "whitesmoke" }}
          value={filter.date}
          onChange={(newValue) => handleChange(newValue)}
        ></DesktopDatePicker>
      </LocalizationProvider>
      <TextField
        id="outlined-number"
        label="EV"
        type="number"
        value={ev}
        onBlur={handleBlurEv}
        onChange={handleChangeEv}
        sx={{ width: "100px" }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        id="outlined-number"
        label="Exposure time"
        onBlur={handleBlurExposureTime}
        onChange={handleChangeExposureTime}
        value={exposureTime}
        type="number"
        sx={{ width: "100px" }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        id="outlined-number"
        label="ISO"
        onBlur={handleBlurIso}
        onChange={handleChangeIso}
        value={iso}
        type="number"
        sx={{ width: "100px" }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        id="outlined-number"
        label="F number"
        type="number"
        onBlur={handleBlurFNumber}
        onChange={handleChangeFNumber}
        value={fnumber}
        sx={{ width: "100px" }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <Button
        size="small"
        color="error"
        variant="outlined"
        onClick={handleResetFilters}
        startIcon={<DeleteIcon />}
      >
        Reset filters
      </Button>
    </div>
  );
}

export default ImageFilterBox;
