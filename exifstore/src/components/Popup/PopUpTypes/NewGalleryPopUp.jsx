import styles from "./NewGalleryPopUp.module.css";
import { TextField, IconButton, Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { useContext, useState } from "react";
import { PopUpContext } from "../../../context/PopUpContext";
import axiosCall from "../../../utils/axiosCall";
import { AuthContext } from "../../../context/AuthContext";
import { GalleryContext } from "../../../context/GalleryContext";

function NewGalleryPopUp() {
  const [newGalleryName, setNewGalleryName] = useState("");
  const { setType } = useContext(PopUpContext);
  const { token } = useContext(AuthContext);
  const { addOption } = useContext(GalleryContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      newGalleryName: newGalleryName,
    };

    // todo: add validation for all forms
    if (newGalleryName) {
      console.log(newGalleryName);
      const response = await axiosCall(
        "post",
        "http://localhost:7000/exifstore/addNewGallery",
        payload,
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      );
      if (!response.error) {
        const newGallery = {
          id: response.data.id,
          name: response.data.name,
        };
        addOption(newGallery);
        setType(null);
      } else {
        console.error("Todo: error when newGallery is not returned");
      }
    }
  }

  function handleBackButton() {
    setType(null);
  }

  return (
    <div className={styles.popUpBox}>
      <form onSubmit={handleSubmit} className={styles.popUpFormWrapper}>
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
        <h2>Create a new gallery</h2>
        <div className={styles.popUpFormBox}>
          <TextField
            value={newGalleryName}
            onChange={(e) => setNewGalleryName(e.target.value)}
            label="Gallery name"
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
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "whitesmoke",
              color: "#55b",
              marginTop: "2rem",
            }}
          >
            Create
          </Button>
        </div>
      </form>
      {/* <div></div>  todo gallery view and thumbnail chooser */}
    </div>
  );
}

export default NewGalleryPopUp;
