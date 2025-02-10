import { useRef, useEffect, useContext } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css"; // Import Dropzone styles
import { AuthContext } from "../../../../context/AuthContext";
import { Button } from "@mui/material";
import AutocompleteAsync from "../../../Sidebar/SidebarActions/AutocompleteAsync/AutocompleteAsync";
import styles from "./AddImagePopUp.module.css";
import UndoIcon from "@mui/icons-material/Undo";
import { IconButton } from "@mui/material";
import { PopUpContext } from "../../../../context/PopUpContext";

const DropzoneComponent = () => {
  const dropzoneRef = useRef(null);
  const dropzoneInstance = useRef(null);
  const { token } = useContext(AuthContext);
  const { setType } = useContext(PopUpContext);

  const generateThumbnail = (file) => {
    const reader = new FileReader();

    // On load, set the image as the thumbnail
    reader.onload = function (e) {
      const thumbnailElement =
        file.previewElement.querySelector(".dz-image img");
      if (thumbnailElement) {
        thumbnailElement.src = e.target.result; // Set the image preview
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (dropzoneRef.current && !Dropzone.instances.length) {
      dropzoneInstance.current = new Dropzone(dropzoneRef.current, {
        url: "http://localhost:7000/exifstore/imageUpload",
        method: "post",
        paramName: "file",
        maxFilesize: 100,
        acceptedFiles: "image/jpeg",
        addRemoveLinks: true,
        dictDefaultMessage: "Drag & drop files here or click to upload",
        autoProcessQueue: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        clickable: true,
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        maxFiles: 10,
      });

      dropzoneInstance.current.on("addedfile", (file) => {
        console.log("File added:", file);
        if (file.type.startsWith("image") && file.size > 10 * 1024 * 1024) {
          generateThumbnail(file);
        } else {
          // For non-image files, show the default file icon or handle them as you see fit, but still dont accept them
          file.previewElement.classList.add("dz-file-preview");
        }
      });
      dropzoneInstance.current.on("processing", (file) => {
        console.log("Processing: ", file.name);
      });

      dropzoneInstance.current.on("success", (file) => {
        console.log("File uploaded successfully: ", file.name);
      });

      dropzoneInstance.current.on("error", (file) => {
        if (file.size > this.options.maxFilesize * 1024 * 1024) {
          console.log("File size error");
        }
      });
    }
  }, [token, dropzoneInstance]);

  function handleUpload() {
    if (dropzoneInstance.current) {
      const queuedFiles = dropzoneInstance.current.getQueuedFiles();

      // Loop over the queued files and upload each one
      queuedFiles.forEach((file) => {
        dropzoneInstance.current.processFile(file);
      });
    }
  }
  function handleBackButton() {
    if (dropzoneInstance.current) {
      console.log("Cancelling uploads and destroying Dropzone...");
      dropzoneInstance.current.removeAllFiles(true); // Cancel uploads and clear files
      dropzoneInstance.current.destroy(); // Destroy Dropzone instance
      dropzoneInstance.current = null; // Reset reference
    }
    setType(null);
  }

  return (
    <>
      <form ref={dropzoneRef} className="dropzone"></form>
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
      </div>
      <div className={styles.addImageFormRow}>
        <label style={{ color: "#222", fontSize: "0.9rem" }} htmlFor="auto">
          Optional
        </label>

        <AutocompleteAsync id="auto" newGalleryOption="false" />
        <br></br>
        <Button
          onClick={handleUpload}
          color="success"
          variant="contained"
          type="submit"
        >
          Upload photos
        </Button>
      </div>
    </>
  );
};
export default DropzoneComponent;
