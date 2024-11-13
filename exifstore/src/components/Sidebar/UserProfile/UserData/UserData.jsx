import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import styles from "./UserData.module.css";

function UserData() {
  const { email, username } = useContext(AuthContext);

  return (
    <div className={styles.userBox}>
      <img className={styles.userImage} src="" alt=""></img>
      <div className={styles.userData}>
        <p style={{ fontWeight: "bold" }}>@{username}</p>
        <p className={styles.userDataEmail}>{email}</p>
      </div>
    </div>
  );
}

export default UserData;
