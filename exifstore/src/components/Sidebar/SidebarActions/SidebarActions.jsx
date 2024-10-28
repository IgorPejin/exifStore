import { Button } from "@mui/material";
import styles from "./SidebarActions.module.css";

function SidebarActions() {
  return (
    <div className={styles.buttonBox}>
      <Button variant="contained" size="large" sx={{ backgroundColor: "#55B" }}>
        Liked images
      </Button>
      <Button variant="contained" size="large" color="success">
        Explore
      </Button>
    </div>
  );
}

export default SidebarActions;
