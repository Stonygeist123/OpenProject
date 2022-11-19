import React from "react";
import styles from "./ToggleButton.module.scss";

const ToggleButton = ({ setState, text, value }: { setState: React.Dispatch<React.SetStateAction<boolean>>; text: string; value: boolean }) => {
  return (
    <>
      <div>
        <label className={`${styles["switch"]}`}>
          <p className={styles["checkbox-text"]}>{text}</p>
          <input type="checkbox" onChange={() => setState(b => !b)} checked={value} />
          <span className={`${styles["slider"]} ${styles["round"]}`}></span>
        </label>
      </div>
    </>
  );
};

export default ToggleButton;
