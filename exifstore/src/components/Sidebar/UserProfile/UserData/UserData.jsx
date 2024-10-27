import styles from "./UserData.module.css";

function UserData() {
  return (
    <div className={styles.userBox}>
      <img className={styles.userImage} src="" alt=""></img>
      <div className={styles.userData}>
        <p style={{ fontWeight: "bold" }}>@UsernameTest</p>
        <p className={styles.userDataEmail}>email@email.test</p>
      </div>
    </div>
  );
}

export default UserData;
