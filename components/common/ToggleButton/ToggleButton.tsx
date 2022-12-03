import React from "react";
import styles from "./ToggleButton.module.scss";

const ToggleButton = ({
  setState,
  value,
  className,
  text,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  value: boolean;
  className?: string;
  text: string;
}) => (
  <div className={className}>
    <label className={`${styles["switch"]}`}>
      <input type="checkbox" onChange={() => setState(b => !b)} checked={value} />
      <span className={`${styles["slider"]} ${styles["round"]}`}></span>
    </label>
    <p className={`${styles["text"]} text-md`}>{text}</p>
  </div>
);

export default ToggleButton;
