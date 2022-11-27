import React from "react";
import styles from "./CreateTaskBox.module.scss";
import Button from "../Button";

const taskNum = "one";
type CreateTaskBoxProps = {
  className?: string;
  value?: string;
  onChange?: () => {};
};
const CreateTaskBox = ({ className, value, onChange }: CreateTaskBoxProps) => {
  return (
    <>
      <div className={`${styles["container"]} ${className}`}>
        <span className={styles["container-title"]}>{`Task ${taskNum}`}</span>
        {/* <div className={styles["container-input-wrapper"]}>
          {" "} */}
        <input className={styles["container-input"]} value={value} onChange={onChange ?? undefined}></input>
        {/* </div> */}
        <div className={styles["container-button-wrapper"]}>
          <Button className={styles["container-button"]} size="s">
            Prerequisites
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateTaskBox;
