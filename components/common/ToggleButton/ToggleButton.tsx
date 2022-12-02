import React from "react";
import styles from "./ToggleButton.module.scss";

const ToggleButton = ({ setState, text, value }: { setState: React.Dispatch<React.SetStateAction<boolean>>; text: string; value: boolean }) => {
  return (
    <>
      <label className={`${styles["switch"]}`}>
        <input type="checkbox" onChange={() => setState(b => !b)} checked={value} />
        <span className={`${styles["slider"]} ${styles["round"]}`}></span>
      </label>
    </>
  );
};

export default ToggleButton;
