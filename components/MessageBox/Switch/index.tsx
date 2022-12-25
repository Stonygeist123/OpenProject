import { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Switch = ({
  handleSwitchClick,
  id,
  activeId,
  hasReplies,
}: {
  handleSwitchClick: () => void;
  id: number;
  activeId: number;
  hasReplies: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(id === activeId);
  }, [id, activeId]);

  return (
    <div className={`flex flex-col justify-center ${styles["switch"]}`}>
      <button
        onClick={handleSwitchClick}
        className={`${styles["context-button"]} ${isOpen ? styles["switched"] : null} ${hasReplies ? "" : "visibility-hidden"} `}
        disabled={!hasReplies}
      >
        <p className={`${styles["context-button-content"]}`}>Switch</p>
      </button>
    </div>
  );
};

export default Switch;
