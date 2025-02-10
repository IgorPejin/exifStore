import styles from "./AddImagePopUp.module.css";

import DropzoneComponent from "./DropzoneComponent";

function AddImagePopUp({ boxStyle }) {
  return (
    <div style={{ width: "70%", height: "75%" }} className={boxStyle}>
      <div className={styles.addImageWrapper}>
        <DropzoneComponent></DropzoneComponent>
      </div>
    </div>
  );
}

export default AddImagePopUp;
