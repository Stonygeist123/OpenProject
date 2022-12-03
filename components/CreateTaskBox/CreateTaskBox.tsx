import React from "react";
import styles from "./CreateTaskBox.module.scss";
import Button from "../common/Button";

type CreateTaskBoxProps = {
  className?: string;
  value?: string;
  onChange?: () => {};
};

const CreateTaskBox = ({ className, value, onChange }: CreateTaskBoxProps) => {
  const handleOnClickPreqs = () => {};

  return (
    <>
      <div className={`${styles["container"]} ${className}`}>
        <div className={`flex flex-row align-center`}>
          <span className={`${styles["container-title"]} font-normal w-12`}>Task</span>
          <input className={`${styles["container-input"]} flex-grow`} value={value} onChange={onChange ?? undefined}></input>
          <div className={`${styles["container-button-wrapper"]} w-12`}>
            <Button onClick={handleOnClickPreqs} className={`${styles["container-button"]} font-normal`} size="s">
              Prerequisites
            </Button>
          </div>
        </div>
        <div className="flex">
          <p className={`w-12 text-center mt-2 text-lg font-lighter`}>Description</p>
          <div className={`${styles["container-textarea-wrapper"]} flex-grow mt-1`}>
            <textarea className={`mt-1 ${styles["container-textarea"]}`} />
          </div>
          <div className={`w-12`}></div>
        </div>
      </div>
    </>
  );
};

export default CreateTaskBox;
