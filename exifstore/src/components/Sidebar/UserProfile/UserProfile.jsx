import UserData from "./UserData/UserData";
import styles from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={styles.userProfileBox}>
      <UserData />
      <div className={styles.userProfileData}>
        <div
          style={{ marginBottom: "1rem" }}
          className={styles.userProfileDataRow}
        >
          <p>Total galleries: </p>
          <p>99</p>
        </div>
        <div className={styles.userProfileDataRow}>
          <p>Total images:</p>
          <p>99</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
