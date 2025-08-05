import styles from "../styles/IcPage.module.css";

function ICPage() {
  return (
    <div>
      <h1 className={styles.titleWithRgbBar}>
        Welcome to pH Meter Project
        <div className={styles.rgbBar}></div>
      </h1>
      <p>This is a simple Next.js application.</p>
    </div>
  );
}

export default ICPage;