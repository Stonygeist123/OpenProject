import Button from "../common/Button";
import styles from "./TaskBox.module.scss";
const TaskBox = ({ key, task }: { key: number; task: Task }) => {
  const handleShowDetails = () => {};

  return (
    <div className={styles["task-container"]}>
      <div className={styles["heading-container"]}>
        <h1 className={`font-bold text-2x ${styles["heading"]}`}>{task.name}</h1>
      </div>

      <div className={styles["description-container"]}>
        <p className={`text-xl ${styles["task-description"]}`}>{task.description}</p>
      </div>

      <div className={styles["button-container"]}>
        <Button
          onClick={handleShowDetails}
          dark={true}
          className={styles["start-button"]}
          text="Show Details"
          key={key}
        />
      </div>
    </div>
  );
};

export default TaskBox;
