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
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { GalleryContext } from "../../../../context/GalleryContext";
import { PopUpContext } from "../../../../context/PopUpContext";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function AutocompleteAsync() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setType } = useContext(PopUpContext);
  const { token } = useContext(AuthContext);
  const {
    selectedGallery,
    setGalleryContext,
    optionsContext,
    setOptionsContext,
  } = useContext(GalleryContext);

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
      setOptionsContext(galleryNames);
      setLoading(false);
    }
    getGalleriesForUser();
  }, [token, setOptionsContext]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, newValue) => {
    setGalleryContext(newValue);
  };

  return (
    <div className={styles.autocompleteBox}>
      <div
        style={
          selectedGallery ? { visibility: "visible" } : { visibility: "hidden" }
        }
        className={styles.autocompleteActions}
      >
        <IconButton onClick={() => setType("edit_gallery")} aria-label="edit">
          <EditIcon sx={{ color: "#55B" }} />
        </IconButton>
        <IconButton
          onClick={() => setType("delete_gallery")}
          aria-label="delete"
        >
          <DeleteForeverIcon sx={{ color: "#55B" }} />
        </IconButton>
      </div>
      <Autocomplete
        sx={{ margin: "1rem 0" }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        options={optionsContext}
        loading={loading}
        value={selectedGallery}
        renderInput={(params) => (
          <TextField
            {...params}
            label={selectedGallery ? selectedGallery.name : "Choose gallery"}
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={() => setType("add_gallery")} aria-label="add">
          <span className={styles.addAction}>Add new gallery </span>
          <AddCircleIcon sx={{ color: "#55B" }} />
        </IconButton>
      </div>
    </div>
  );
}
