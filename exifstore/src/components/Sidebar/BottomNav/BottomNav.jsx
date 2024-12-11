import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./BottomNav.module.css";

function BottomNav() {
  return (
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
            href="https://github.com/IgorPejin/exifStore"
            target="_blank"
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
  );
}

export default BottomNav;
