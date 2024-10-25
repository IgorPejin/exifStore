import styles from "./Sidebar.module.css";
import Button from "@mui/material/Button";
import UserProfile from "./UserProfile/UserProfile";

function Sidebar() {
  return (
    <>
      <nav className={styles.sidebar}>
        <UserProfile />
        <div className={styles.buttonBox}>
          <Button variant="contained" size="large">
            Liked images
          </Button>
          <Button variant="contained" size="large" color="success">
            Explore
          </Button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
