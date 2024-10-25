import UserData from "./UserData/UserData";
import styles from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={styles.userProfileBox}>
      <UserData />
      <div className={styles.userProfileData}>
        <p style={{ marginBottom: "1rem" }}>Total galleries: 99</p>
        <p>Total images: 99</p>
      </div>
    </div>
  );
}

export default UserProfile;
