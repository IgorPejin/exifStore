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
import { floatRegex, integerRegex } from "../../../../utils/regex";

dayjs.extend(utc);

function ImageFilterBox() {
  const { setRefresh, deleteFilter, resetFilters, updateFilter, filter } =
    useContext(FilterContext);

  const [ev, setEv] = useState("");
  const [exposureTime, setExposureTime] = useState("");
  const [iso, setIso] = useState("");
  const [fnumber, setFNumber] = useState("");

  function handleResetFilters() {
    setEv("");
    setExposureTime("");
    setIso("");
    setFNumber("");
    resetFilters();
    setRefresh(true);
  }

  //todo: abstract handlers

  function handleChange(newValue) {
    const date = newValue.$d.toISOString().split("T")[0];
    updateFilter("date_time", date);
  }

  function handleChangeEv(e) {
    const newValue = e.target.value;
    setEv(newValue);
  }
  function handleBlurEv(e) {
    const number = e.target.value;
    const regexTest = floatRegex.test(number);
    if (regexTest) {
      updateFilter("ev", parseFloat(ev));
    } else {
      setEv("");
      deleteFilter("ev");
    }
  }

  function handleChangeExposureTime(e) {
    const newValue = e.target.value;
    setExposureTime(newValue);
  }

  function handleBlurExposureTime(e) {
    const number = e.target.value;
    const regexTest = floatRegex.test(number);
    if (regexTest) {
      updateFilter("exposure_time", parseFloat(exposureTime));
    } else {
      setExposureTime("");
      deleteFilter("exposure_time");
    }
  }

  function handleChangeIso(e) {
    const newValue = e.target.value;
    setIso(newValue);
  }

  function handleBlurIso(e) {
    const number = e.target.value;
    const regexTest = integerRegex.test(number);
    if (regexTest) {
      updateFilter("iso", parseFloat(iso));
    } else {
      setIso("");
      deleteFilter("iso");
    }
  }

  function handleChangeFNumber(e) {
    const newValue = e.target.value;
    setFNumber(newValue);
  }

  function handleBlurFNumber(e) {
    const number = e.target.value;
    const regexTest = floatRegex.test(number);
    if (regexTest) {
      updateFilter("f_number", parseFloat(fnumber));
    } else {
      setFNumber("");
      deleteFilter("f_number");
    }
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
        type="text"
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
        type="text"
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
        type="text"
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
        type="text"
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
