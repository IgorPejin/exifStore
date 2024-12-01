import { Button } from "@mui/material";
import styles from "./SidebarActions.module.css";
import AutoCompleteAsync from "./AutocompleteAsync/AutocompleteAsync";

function SidebarActions() {
  return (
    <div className={styles.buttonBox}>
      <AutoCompleteAsync />
      {/* todo in future: likes,comments,explore */}
      <div style={{ display: "none" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "#55B" }}
        >
          Liked images
        </Button>
        <Button variant="contained" size="large" color="success">
          Explore
        </Button>
      </div>
    </div>
  );
}

export default SidebarActions;
