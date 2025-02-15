// Hero.js
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {
  const navigation = useNavigate();
  function handleClick() {
    navigation("/login");
  }

  return (
    <div className={styles.hero}>
      <div className={styles.textContainer}>
        <h1 className={styles.heroHeading1}>ExifStore </h1>
        <h2 className={styles.heroHeading2}>Share, store & explore!</h2>
        <ul className={styles.heroList}>
          <li className={styles.listItem}>Store your images in galleries!</li>
          <li className={styles.listItem}>
            Filter them by date, ISO, EV and more!
          </li>
          <li className={styles.listItem}>
            Share galleries with others and explore more great photos!
          </li>
        </ul>
        <button onClick={handleClick} className={styles.heroButton}>
          Get Started
        </button>
      </div>
      <img src="" alt="Hero" className={styles.heroImage} />
    </div>
  );
}

export default Hero;
