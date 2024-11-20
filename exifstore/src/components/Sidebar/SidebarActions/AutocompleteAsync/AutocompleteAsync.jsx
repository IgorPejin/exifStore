import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState, useContext } from "react";
import axiosCall from "../../../../utils/axiosCall";
import { AuthContext } from "../../../../context/AuthContext";
import styles from "./AutocompleteAsync.module.css";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { GalleryContext } from "../../../../context/GalleryContext";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function AutocompleteAsync() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { token } = useContext(AuthContext);
  const { setGalleryContext } = useContext(GalleryContext);

  useEffect(() => {
    async function getGalleriesForUser() {
      setLoading(true);
      await sleep(1e3);
      const response = await axiosCall(
        "get",
        "http://localhost:7000/exifstore/galleriesForUser",
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      const galleryNames = response.data.map((gallery) => ({
        id: gallery.id,
        name: gallery.name,
      }));
      setOptions(galleryNames);
      setLoading(false);
    }
    getGalleriesForUser();
  }, [token, options.length]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, newValue) => {
    setSelectedOption(newValue);
    setGalleryContext(newValue);
  };

  return (
    <div className={styles.autocompleteBox}>
      <div
        style={
          selectedOption ? { visibility: "visible" } : { visibility: "hidden" }
        }
        className={styles.autocompleteActions}
      >
        <IconButton aria-label="edit">
          <EditIcon sx={{ color: "#55B" }} />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteForeverIcon sx={{ color: "#55B" }} />
        </IconButton>
      </div>
      <Autocomplete
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        options={options}
        loading={loading}
        value={selectedOption}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose gallery"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
    </div>
  );
}
