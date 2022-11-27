import React from "react";
import styles from "./CreateTaskBox.module.scss";
import Button from "../Button";

const taskNum = "one";
<<<<<<< HEAD
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
=======
const CreateTaskBox = () => {
  return (
    <>
      <div className={styles["container"]}>
        <span className={styles["container-title"]}>{`Task ${taskNum}`}</span>
        {/* <div className={styles["container-input-wrapper"]}>
          {" "} */}
        <input className={styles["container-input"]}></input>
>>>>>>> 1b387b4d620ad6d4812eb2dc0f77692bfba70878
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
