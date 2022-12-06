import CreateTaskBox from "../../CreateTaskBox/CreateTaskBox";

import styles from "./TaskCreation.module.scss";

const TaskCreation = () => {
  return (
    <div>
      <h1 className={`${styles["heading"]}`}> This is task creation! </h1>

      <div className={`${styles["taskbox-container"]}`}>
        <CreateTaskBox
          projectId={1}
          className="mt-1"
        />
        <CreateTaskBox
          projectId={1}
          className="mt-1"
        />
        <CreateTaskBox
          projectId={1}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default TaskCreation;
