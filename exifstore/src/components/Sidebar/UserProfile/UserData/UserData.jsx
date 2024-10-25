import styles from "./UserData.module.css";

function UserData() {
  return (
    <div className={styles.userBox}>
      <img className={styles.userImage} src="" alt=""></img>
      <div className={styles.userData}>
        <span>@UsernameTest</span>
        <span>email@email.test</span>
      </div>
    </div>
  );
}

export default UserData;
