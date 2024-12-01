import { useContext } from "react";
import { PopUpContext } from "../../context/PopUpContext";
import styles from "./PopUp.module.css";
import NewGalleryPopUp from "./PopUpTypes/NewGalleryPopUp/NewGalleryPopUp";
import YesNoPopUp from "./PopUpTypes/YesNoPopUp/YesNoPopUp";

function PopUp() {
  const { type } = useContext(PopUpContext);

  return (
    <div
      style={!type ? { display: "none" } : { display: "flex" }}
      className={styles.popUpWrapper}
    >
      {type === "add_gallery" && <NewGalleryPopUp boxStyle={styles.popUpBox} />}
      {type === "delete_gallery" && <YesNoPopUp boxStyle={styles.popUpBox} />}
    </div>
  );
}

export default PopUp;
