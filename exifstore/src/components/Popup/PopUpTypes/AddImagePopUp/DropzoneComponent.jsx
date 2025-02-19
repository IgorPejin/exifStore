import { useRef, useEffect, useContext, useState } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css"; // Import Dropzone styles
import { AuthContext } from "../../../../context/AuthContext";
import { Button } from "@mui/material";
import AutocompleteAsync from "../../../Sidebar/SidebarActions/AutocompleteAsync/AutocompleteAsync";
import styles from "./AddImagePopUp.module.css";
import UndoIcon from "@mui/icons-material/Undo";
import { IconButton } from "@mui/material";
import { PopUpContext } from "../../../../context/PopUpContext";
import { GalleryContext } from "../../../../context/GalleryContext";
import { FilterContext } from "../../../../context/FilterContext";
import exifr from "exifr";

const DropzoneComponent = () => {
  const dropzoneRef = useRef(null);
  const dropzoneInstance = useRef(null);
  const { token } = useContext(AuthContext);
  const { setType } = useContext(PopUpContext);
  const { selectedGallery, setImageCounter, imageCounter } =
    useContext(GalleryContext);
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const selectedGalleryId = selectedGallery ? selectedGallery.id : 0;
  const { setRefresh } = useContext(FilterContext);
  const fileCount = useRef(imageCounter);
  const [isDropzoneUsed, setIsDropzoneUsed] = useState(false);

  const generateThumbnail = async (file) => {
    const thumbnailElement = file.previewElement.querySelector(".dz-image img");
    const reader = new FileReader();
    const exifThumbnail = await exifr.thumbnailUrl(file);
    console.log(exifThumbnail);
    if (thumbnailElement) {
      if (exifThumbnail) thumbnailElement.src = exifThumbnail;
      else {
        reader.onload = function (e) {
          thumbnailElement.src = e.target.result; // read image if no exif thumbnail
        };
        reader.readAsDataURL(file);
      }
    }
  };

  useEffect(() => {
    if (dropzoneRef.current && !Dropzone.instances.length) {
      dropzoneInstance.current = new Dropzone(dropzoneRef.current, {
        url: `http://localhost:7000/exifstore/imageUpload/?selectedGalleryId=${selectedGalleryId}`,
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
        thumbnailWidth: 350,
        thumbnailHeight: 350,
        maxFiles: 100,
        parallelUploads: 10,
      });

      dropzoneInstance.current.on("addedfile", (file) => {
        console.log("File added:", file);
        if (file.type.startsWith("image") && file.size > 10 * 1024 * 1024) {
          generateThumbnail(file);
        } else {
          // For non-image files, show the default file icon or handle them as you see fit, but still dont accept them
          file.previewElement.classList.add("dz-file-preview");
        }
        setIsUploadEnabled(dropzoneInstance.current.files.length > 0);
      });
      dropzoneInstance.current.on("processing", (file) => {
        console.log("Processing: ", file.name);
      });

      dropzoneInstance.current.on("success", (file) => {
        console.log("File uploaded successfully: ", file.name);
        fileCount.current = fileCount.current + 1;
      });

      dropzoneInstance.current.on("queuecomplete", () => {
        setImageCounter(fileCount.current);
        setIsDropzoneUsed(true);
        setTimeout(() => {
          console.log("All files finished uploading! (Delayed by 2 seconds)");
          fileCount.current = 0;
          dropzoneInstance.current.removeAllFiles(true); // Cancel uploads and clear files
        }, 3000); // 2000ms = 2 seconds
      });

      dropzoneInstance.current.on("removedfile", (file) => {
        console.log("Removed file: " + file.name);
        setIsUploadEnabled(dropzoneInstance.current.files.length > 0);
      });

      dropzoneInstance.current.on("error", (file) => {
        if (file.size > this.options.maxFilesize * 1024 * 1024) {
          console.log("File size error");
        }
      });
    }
  }, [
    token,
    fileCount,
    dropzoneInstance,
    selectedGalleryId,
    setRefresh,
    setImageCounter,
  ]);

  function triggerUploadSequence(confirmStatus) {
    if (!dropzoneInstance.current) return;

    function processBatch() {
      if (
        confirmStatus &&
        dropzoneInstance.current.getQueuedFiles().length > 0
      ) {
        dropzoneInstance.current.processQueue();
        setTimeout(() => {
          processBatch(); // Recursively call processBatch to handle the next batch
        }, 3000);
      }
    }

    processBatch();
  }

  function handleUpload() {
    dropzoneInstance.current.options.url = `http://localhost:7000/exifstore/imageUpload/?selectedGalleryId=${selectedGalleryId}`; // set url again in case selected gallery
    let confirmStatus = true;
    if (selectedGalleryId == 0) {
      if (
        confirm(
          "You have not sellected a gallery. Do you wish to add the image without a gallery?"
        ) === true
      ) {
        confirmStatus = true;
      } else {
        confirmStatus = false;
      }
    }
    triggerUploadSequence(confirmStatus);
  }
  function handleBackButton() {
    if (dropzoneInstance.current) {
      console.log("Cancelling uploads and destroying Dropzone...");
      dropzoneInstance.current.removeAllFiles(true); // Cancel uploads and clear files
      dropzoneInstance.current.destroy(); // Destroy Dropzone instance
      dropzoneInstance.current = null; // Reset reference
    }
    setType(null);
    if (isDropzoneUsed) {
      setRefresh(true);
      setIsDropzoneUsed(false);
    }
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
          disabled={isUploadEnabled ? false : true}
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
