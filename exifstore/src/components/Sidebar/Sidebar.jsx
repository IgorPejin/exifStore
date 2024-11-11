import styles from "./Sidebar.module.css";
import UserProfile from "./UserProfile/UserProfile";
import SidebarActions from "./SidebarActions/SidebarActions";
import BottomNav from "./BottomNav/BottomNav";

function Sidebar() {
  return (
    <>
      <nav className={styles.sidebar}>
        <UserProfile />
        <SidebarActions />
        <BottomNav />
      </nav>
    </>
  );
}

export default Sidebar;
