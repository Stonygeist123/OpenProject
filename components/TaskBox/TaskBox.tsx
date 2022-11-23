import Button from "../Button";
import styles from "./TaskBox.module.scss";
const TaskBox = ({ key, text }: { key: number; text?: string }) => {
  const placeHolderText =
    "Lorem ipsum dolor sit amet. Id dolor rerum ea internos tempora aut itaque nostrum ut iure aspernatur et fugit consectetur aspernatur.";
  const renderText = () => (text ? text.substring(0, 130) : placeHolderText);

  return (
    <div className={styles["task-container"]} key={key}>
      <div className={styles["heading-container"]}>
        <h1 className={styles["heading"]}> {"Task"} </h1>
      </div>

      <div className={styles["description-container"]}>
        <p className={styles["task-description"]}>{renderText()}</p>
      </div>

      <div className={styles["button-container"]}>
        <Button dark={true} className={styles["start-button"]}>
          Show Details
        </Button>
      </div>
    </div>
  );
};

export default TaskBox;
