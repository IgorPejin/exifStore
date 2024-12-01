import { useContext } from "react";
import { GalleryContext } from "../../../../context/GalleryContext";

import styles from "./YesNoPopUp.module.css";
import { Button } from "@mui/material";
import { PopUpContext } from "../../../../context/PopUpContext";
import { AuthContext } from "../../../../context/AuthContext";
import axiosCall from "../../../../utils/axiosCall";

function YesNoPopUp({ boxStyle }) {
  const { selectedGallery } = useContext(GalleryContext);
  const { setType } = useContext(PopUpContext);
  const { token } = useContext(AuthContext);

  const { deleteOption, setSelectedGallery, resetImageList } =
    useContext(GalleryContext);

  async function handleYes() {
    const response = await axiosCall(
      "DELETE",
      `http://localhost:7000/exifstore/deleteGalleryById?id=${selectedGallery.id}`,
      undefined,
      { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    );
    console.log(response);
    if (response.status === 200) {
      deleteOption(selectedGallery);
      setSelectedGallery(null);
      setType(null);
      resetImageList();
    } else {
      alert("Error when deleting gallery");
    }
  }

  function handleNo() {
    setType(null);
  }

  return (
    <div className={boxStyle}>
      <div className={styles.yesNoBox}>
        <h2>
          Are you sure you want to delete gallery : <br />
          <br />
          <br />
          &quot;{selectedGallery.name}
          &quot;
        </h2>
        <div className={styles.buttons}>
          <Button
            onClick={handleYes}
            variant="contained"
            size="large"
            color="success"
          >
            Yes
          </Button>
          <Button
            onClick={handleNo}
            variant="contained"
            size="large"
            color="error"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}

export default YesNoPopUp;
