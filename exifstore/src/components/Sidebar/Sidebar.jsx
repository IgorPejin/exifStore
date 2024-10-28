import styles from "./Sidebar.module.css";
import UserProfile from "./UserProfile/UserProfile";
import SidebarActions from "./SidebarActions/SidebarActions";
import BottomNav from "./BottomNav/BottomNav";
import AutocompleteAsync from "./AutocompleteAsync/AutocompleteAsync";

function Sidebar() {
  return (
    <>
      <nav className={styles.sidebar}>
        <UserProfile />
        <AutocompleteAsync />
        <SidebarActions />
        <BottomNav />
      </nav>
    </>
  );
}

export default Sidebar;
