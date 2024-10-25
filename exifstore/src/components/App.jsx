import Sidebar from "./Sidebar/Sidebar";
import styles from "./App.module.css";
import Gallery from "./Gallery/Gallery";

function App() {
  return (
    <div className={styles.exifApp}>
      <Sidebar />
      <Gallery />
    </div>
  );
}

export default App;
