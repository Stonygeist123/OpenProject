import { useState } from "react";
import MessageBox from "../MessageBox";
import styles from "./index.module.scss";

const DiscussionThread = ({
  msgs,
  sub = false,
  className,
  setSubthreadID,
  setReload,
}: {
  changeThread?: () => {};
  msgs: Omit<Msg, "community">[];
  sub?: boolean;
  className?: string;
  setSubthreadID: React.Dispatch<React.SetStateAction<number | null>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [subOpened, setSubOpened] = useState(false);

  return (
    <div
      className={`flex flex-col ${styles["thread"]} ${sub ? styles["subthread"] : null} ${
        msgs.length === 0 ? styles["no-switch"] : null
      } ${className}`}
    >
      {msgs.map((m, i) => (
        <div
          key={i}
          className={styles["message-container"]}
        >
          {m.hasReplies ? (
            <div className={`flex flex-col justify-center ${styles["switch"]}`}>
              <button
                onClick={() => {
                  setSubOpened(v => !v);
                  setSubthreadID(m.id);
                }}
                className={`${styles["context-button"]} ${subOpened ? styles["switched"] : null}`}
              >
                <p className={`${styles["context-button-content"]}`}>Switch</p>
              </button>
            </div>
          ) : null}

          <MessageBox
            key={m.id}
            message={{ ...m, community: null }}
            isFirst={i === 0}
            isLast={i + 1 >= msgs.length}
            setReload={setReload}
          />
        </div>
      ))}
    </div>
  );
};

export default DiscussionThread;
