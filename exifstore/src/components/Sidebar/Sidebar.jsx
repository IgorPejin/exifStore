import styles from "./Sidebar.module.css";
import Button from "@mui/material/Button";
import UserProfile from "./UserProfile/UserProfile";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import GitHubIcon from "@mui/icons-material/GitHub";

function Sidebar() {
  return (
    <>
      <nav className={styles.sidebar}>
        <UserProfile />
        <div className={styles.buttonBox}>
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
        <div>
          <List sx={{ padding: "1rem" }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemIcon>
                  <HelpCenterIcon />
                </ListItemIcon>
                <ListItemText sx={{ marginTop: "0.7rem" }} primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                component="a"
                href="https://github.com/IgorPejin"
              >
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText sx={{ marginTop: "0.7rem" }} primary="Github" />
              </ListItemButton>
            </ListItem>
          </List>
          <div className={styles.authorBox}>
            <p>exifstore app by ipejin</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
