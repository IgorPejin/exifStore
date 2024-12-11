import { useContext } from "react";
import styles from "./ImageList.module.css";
import MasonryImageList from "./MasonryImageList/MasonryImageList";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { GalleryContext } from "../../../context/GalleryContext";
import { PopUpContext } from "../../../context/PopUpContext";

function ImageList() {
  const { currentPage, setCurrentPage, loading, totalPages, setRefresh } =
    useContext(GalleryContext);
  const { setType } = useContext(PopUpContext);
  const handleChange = (event, value) => {
    setRefresh(true);
    setCurrentPage(value);
  };

  return (
    <div className={styles.imageListBox}>
      <div className={styles.imageListWrapper}>
        {loading ? <CircularProgress /> : <MasonryImageList />}
      </div>
      {
        <div className={styles.imageListActionBox}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            variant="outlined"
            size="large"
            showFirstButton
            showLastButton
          ></Pagination>
          <IconButton
            sx={{ position: "absolute", right: "2.5%", bottom: "5%" }}
            aria-label="add"
            size="large"
            onClick={() => setType("add_image")}
          >
            <AddCircleIcon color="success" sx={{ fontSize: "4rem" }} />
          </IconButton>
        </div>
      }
    </div>
  );
}

export default ImageList;
