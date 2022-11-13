import React from "react";
import styles from "./ToggleButton.module.scss";

const ToggleButton = ({ setState }: { setState: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <>
      <div>
        <label className={`${styles["switch"]}`}>
          <input type="checkbox" onChange={() => setState(b => !b)} />
          <span className={`${styles["slider"]} ${styles["round"]}`}></span>
        </label>
      </div>
    </>
  );
};

export default ToggleButton;
