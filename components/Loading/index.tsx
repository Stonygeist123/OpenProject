import styles from "./index.module.scss";

const Loading = () => (
  <div className={styles["loader"]}>
    <div className={styles["spinner"]}></div>
  </div>
);

export default Loading;
