import { Button, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import { PopUpContext } from "../../../../context/PopUpContext";
import styles from "./AddImagePopUp.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axiosCall from "../../../../utils/axiosCall";
import { AuthContext } from "../../../../context/AuthContext";
import { GalleryContext } from "../../../../context/GalleryContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddImagePopUp({ boxStyle }) {
  const { setType } = useContext(PopUpContext);
  const { token } = useContext(AuthContext);
  const { selectedGallery, addImage } = useContext(GalleryContext);

  const [image, setImage] = useState(null);

  useEffect(() => {
    function addImage() {
      console.log(image);
      if (FileReader && image && image.type === "image/jpeg") {
        const fr = new FileReader();
        const imageTag = document.getElementById("imageThumbnail");
        fr.onload = (e) => {
          imageTag.src = e.target.result;
        };
        fr.readAsDataURL(image);
      } else {
        //todo: add validation for all forms
        alert("Please select a jpeg image!");
      }
    }
    if (image) addImage();
  }, [image]);

  function handleBackButton() {
    setType(null);
    setImage(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const id = selectedGallery ? selectedGallery.id : 0;

    let confirmStatus = true;
    if (id == 0) {
      if (
        confirm(
          "You have not sellected a gallery. Do you wish to add the image without a gallery?"
        ) === true
      ) {
        confirmStatus = true;
      } else confirmStatus = false;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("confirm", confirmStatus);

    if (confirmStatus) {
      const response = await axiosCall(
        "post",
        `http://localhost:7000/exifstore/imageUpload?id=${id}`,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      const image = response.data;
      console.log(image);
      addImage(image);
      setType(null);
    }
  }

  function handleAddImage(e) {
    // clear image name of extensions : todo
    setImage(e.target.files[0]); // one image for now
  }

  return (
    <div className={boxStyle}>
      <div className={styles.addImageBox}>
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
        <div className={styles.addImageWrapper}>
          <form
            encType="multipart/form-data"
            className={styles.addImageForm}
            onSubmit={handleSubmit}
          >
            <Button
              component="label"
              sx={{ backgroundColor: "whitesmoke", color: "#55b" }}
              className={styles.addButton}
              variant="contained"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Choose image
              <VisuallyHiddenInput
                type="file"
                onChange={handleAddImage}
                // multiple : todo
              />
            </Button>
            <Button
              color="success"
              className={styles.editButton}
              variant="contained"
              type="submit"
            >
              Upload image
            </Button>
          </form>
          <img id="imageThumbnail" className={styles.imageThumbnail} src="" />
        </div>
      </div>
    </div>
  );
}

export default AddImagePopUp;
