import { useState } from "react";
import styles from "./ImageList.module.css";
import MasonryImageList from "./MasonryImageList/MasonryImageList";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function ImageList() {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className={styles.imageListBox}>
      <div className={styles.imageListWrapper}>
        <MasonryImageList></MasonryImageList>
      </div>
      <div className={styles.imageListActionBox}>
        <Pagination
          count={99}
          page={page}
          onChange={handleChange}
          color="primary"
          variant="outlined"
          size="large"
          showFirstButton
          showLastButton
        ></Pagination>
        <IconButton
          sx={{ position: "absolute", right: "2.5%", bottom: "5%" }}
          aria-label="delete"
          size="large"
        >
          <AddCircleIcon color="success" sx={{ fontSize: "4rem" }} />
        </IconButton>
      </div>
    </div>
  );
}

export default ImageList;
