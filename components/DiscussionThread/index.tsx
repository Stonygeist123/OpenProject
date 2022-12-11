import { useState } from "react";
import MessageBox from "../MessageBox/MessageBox";
import styles from "./DiscussionThread.module.scss";

const DiscussionThread = ({
  thread,
  sub = false,
  className,
  isFirst = false,
  isLast = false,
  setReply,
}: {
  changeThread?: () => {};
  thread: Thread<true>;
  sub?: boolean;
  className?: string;
  isFirst?: boolean;
  isLast?: boolean;
  setReply?: React.Dispatch<React.SetStateAction<number | undefined>> | undefined;
}) => {
  const [subOpened, setSubOpened] = useState(false);

  return (
    <div className={`flex flex-row ${styles["thread"]} ${sub ? styles["subthread"] : null} ${className}`}>
      <div className={`flex flex-col justify-center ${styles["switch"]}`}>
        <button className={`${styles["context-button"]}`}>
          <p className={`${styles["context-button-content"]}`}>Switch</p>
        </button>
      </div>
      <MessageBox
        key={thread.top.id}
        message={{ ...thread.top, community: null }}
        toggleSubthread={setSubOpened}
        subs={thread.replies.length > 0}
        isFirst={isFirst}
        isLast={isLast}
        setReply={setReply}
      />

      <div className={styles["messages"]}>
        {subOpened &&
          thread.replies
            .sort(
              (a, b) =>
                (Object.hasOwn(a, "top") ? new Date((a as Thread<true>).top.created_at) : new Date((a as Msg).created_at)).getTime() -
                (Object.hasOwn(b, "top") ? new Date((b as Thread<true>).top.created_at) : new Date((b as Msg).created_at)).getTime()
            )
            .map((r, i, arr) => (
              <DiscussionThread
                key={i}
                thread={
                  Object.hasOwn(r, "top")
                    ? { top: (r as Thread<true>).top, replies: (r as Thread<true>).replies }
                    : { top: r as Omit<Msg, "community">, replies: [] }
                }
                sub
                isFirst={i === 0}
                isLast={i + 1 === arr.length}
                setReply={setReply}
              />
            ))}
      </div>
    </div>
  );
};

export default DiscussionThread;
