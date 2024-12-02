import { useContext } from "react";
import { PopUpContext } from "../../context/PopUpContext";
import styles from "./PopUp.module.css";
import NewGalleryPopUp from "./PopUpTypes/NewGalleryPopUp/NewGalleryPopUp";
import YesNoPopUp from "./PopUpTypes/YesNoPopUp/YesNoPopUp";
import EditGalleryPopUp from "./PopUpTypes/EditGalleryPopUp/EditGalleryPopUp";
import AddImagePopUp from "./PopUpTypes/AddImagePopUp/AddImagePopUp";

function PopUp() {
  const { type } = useContext(PopUpContext);

  return (
    <div
      style={!type ? { display: "none" } : { display: "flex" }}
      className={styles.popUpWrapper}
    >
      {type === "add_gallery" && <NewGalleryPopUp boxStyle={styles.popUpBox} />}
      {type === "add_image" && <AddImagePopUp boxStyle={styles.popUpBox} />}
      {type === "delete_gallery" && <YesNoPopUp boxStyle={styles.popUpBox} />}
      {type === "edit_gallery" && (
        <EditGalleryPopUp boxStyle={styles.popUpBox} />
      )}
    </div>
  );
}

export default PopUp;
