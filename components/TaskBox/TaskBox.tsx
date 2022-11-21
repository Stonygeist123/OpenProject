import Button from "../Button";
import styles from "./TaskBox.module.scss";
const TaskBox = ({ key }: { key: number }) => {
  return (
    <div className={styles["task-box"]} key={key}>
      <h1> {"Task"} </h1>
      <p className={styles["task-description"]}>
        Lorem ipsum dolor sit amet. Id dolor rerum ea internos tempora aut itaque nostrum ut iure aspernatur et fugit consectetur aspernatur.
      </p>
      <div className={styles["button-container"]}>
        <Button dark={true} className={styles["start-button"]}>
          Show Details
        </Button>
      </div>
    </div>
  );
};

export default TaskBox;
