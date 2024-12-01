import { Button, IconButton, TextField } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import styles from "./EditGalleryPopUp.module.css";
import { useContext, useState } from "react";
import { PopUpContext } from "../../../../context/PopUpContext";
import axiosCall from "../../../../utils/axiosCall";
import { AuthContext } from "../../../../context/AuthContext";
import { GalleryContext } from "../../../../context/GalleryContext";

function EditGalleryPopUp({ boxStyle }) {
  const { setType } = useContext(PopUpContext);
  const { token } = useContext(AuthContext);
  const { selectedGallery, updateOption } = useContext(GalleryContext);
  const [newGalleryName, setNewGalleryName] = useState("");
  function handleBackButton() {
    setType(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // todo: validation of forms
    if (newGalleryName) {
      const payload = {
        newGalleryName: newGalleryName,
      };
      const response = await axiosCall(
        "put",
        `http://localhost:7000/exifstore/updateGalleryById?id=${selectedGallery.id}`,
        payload,
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      );
      if (response.status === 200) {
        updateOption(newGalleryName);
        setType(null);
      } else {
        alert("Error when updating gallery");
      }
    }
  }

  return (
    <div className={boxStyle}>
      <div className={styles.editPopUp}>
        <IconButton
          onClick={handleBackButton}
          sx={{
            position: "absolute",
            top: "2%",
            left: "2%",
            transition: "all 0.1s ease-in ",
            ":hover": { color: "white" },
          }}
          aria-label="delete"
        >
          <UndoIcon />
        </IconButton>
        <div className={styles.editWrapper}>
          <form className={styles.editForm} onSubmit={handleSubmit}>
            <TextField
              value={newGalleryName}
              onChange={(e) => setNewGalleryName(e.target.value)}
              label="New gallery name"
              type="text"
              variant="outlined"
              slotProps={{
                input: {
                  sx: {
                    color: "whitesmoke",
                    margin: "0.5rem 0",
                  },
                },
                htmlInput: {
                  maxLength: 16,
                },
              }}
              sx={{
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "whitesmoke",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "whitesmoke" },
                  "&:hover fieldset": { borderColor: "whitesmoke" },
                  "&.Mui-focused fieldset": { borderColor: "whitesmoke" },
                },
                "& .MuiInputLabel-root": { color: "whitesmoke" },
              }}
            />
            <Button
              sx={{ backgroundColor: "whitesmoke", color: "#55b" }}
              className={styles.editButton}
              variant="contained"
              type="submit"
            >
              Edit
            </Button>
          </form>
          <img className={styles.editThumbnail} src="#" />
        </div>
      </div>
    </div>
  );
}

export default EditGalleryPopUp;
