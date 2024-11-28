import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./ExifStoreApp.module.css";
import Gallery from "../../components/Gallery/Gallery";
import PopUp from "../../components/Popup/PopUp.jsx";

function ExifStoreApp() {
  return (
    <div className={styles.exifApp}>
      <Sidebar />
      <Gallery />
      <PopUp />
    </div>
  );
}

export default ExifStoreApp;
