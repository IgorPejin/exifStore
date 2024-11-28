import { useContext } from "react";
import { PopUpContext } from "../../context/PopUpContext";
import styles from "./PopUp.module.css";
import NewGalleryPopUp from "./PopUpTypes/NewGalleryPopUp";

function PopUp() {
  const { type } = useContext(PopUpContext);

  return (
    <div
      style={!type ? { display: "none" } : { display: "flex" }}
      className={styles.popUpWrapper}
    >
      {type === "add_gallery" && <NewGalleryPopUp />}
    </div>
  );
}

export default PopUp;
