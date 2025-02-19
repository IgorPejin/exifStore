import { useContext, useEffect } from "react";
import UserData from "./UserData/UserData";
import styles from "./UserProfile.module.css";
import { GalleryContext } from "../../../context/GalleryContext";
import axiosCall from "../../../utils/axiosCall";
import { AuthContext } from "../../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

function UserProfile() {
  const { token } = useContext(AuthContext);
  const {
    optionsContext,
    imageCounter,
    setImageCounter,
    setImageCounterLoader,
    imageCounterLoader,
  } = useContext(GalleryContext);

  useEffect(() => {
    async function getImagesCount() {
      setImageCounterLoader(true);
      const response = await axiosCall(
        "get",
        `http://localhost:7000/exifstore/imagesByUser`,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      setImageCounter(response.data);
    }
    if (token) getImagesCount();
    setImageCounterLoader(false);
  }, [token, setImageCounter, setImageCounterLoader]);

  return (
    <div className={styles.userProfileBox}>
      <UserData />
      <div className={styles.userProfileData}>
        <div
          style={{ marginBottom: "1rem" }}
          className={styles.userProfileDataRow}
        >
          <p>Total galleries: </p>
          <p>
            {optionsContext.length === 0 ? (
              <CircularProgress size={"10px"} />
            ) : (
              optionsContext.length
            )}
          </p>
        </div>
        <div className={styles.userProfileDataRow}>
          <p>Total images:</p>
          <p>
            {imageCounterLoader || optionsContext.length === 0 ? (
              <CircularProgress size={"10px"} />
            ) : (
              imageCounter
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
