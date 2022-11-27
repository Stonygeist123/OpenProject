import CreateTaskBox from "../../../components/CreateTaskBox/CreateTaskBox";
import styles from "../../../styles/pages/project/add-tasks.module.scss";
const AddTasksPage = () => {
  return (
    <div className={styles["wrapper"]}>
      <h1 className={styles["heading"]}>Heading</h1>

      <div className={styles["container"]}>
        <CreateTaskBox className={styles["task"]} />
        <CreateTaskBox className={styles["task"]} />
        <CreateTaskBox className={styles["task"]} />
        <CreateTaskBox className={styles["task"]} />
      </div>
    </div>
  );
};

export default AddTasksPage;
