import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./ExifStoreApp.module.css";
import Gallery from "../../components/Gallery/Gallery";

function ExifStoreApp() {
  return (
    <div className={styles.exifApp}>
      <Sidebar />
      <Gallery />
    </div>
  );
}

export default ExifStoreApp;
