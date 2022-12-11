import { useState } from "react";
import MessageBox from "../MessageBox/MessageBox";
import styles from "./DiscussionThread.module.scss";

const DiscussionThread = ({
  thread,
  sub = false,
  className,
}: {
  changeThread?: () => {};
  thread: Thread<true>;
  sub?: boolean;
  className?: string;
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
      />
      {subOpened &&
        thread.replies
          .sort(
            (a, b) =>
              (Object.hasOwn(a, "top") ? new Date((a as Thread<true>).top.created_at) : new Date((a as Msg).created_at)).getTime() -
              (Object.hasOwn(b, "top") ? new Date((b as Thread<true>).top.created_at) : new Date((b as Msg).created_at)).getTime()
          )
          .map((r, i) => (
            <DiscussionThread
              key={i}
              thread={
                Object.hasOwn(r, "top")
                  ? { top: (r as Thread<true>).top, replies: (r as Thread<true>).replies }
                  : { top: r as Omit<Msg, "community">, replies: [] }
              }
              sub
            />
          ))}
    </div>
  );
};

export default DiscussionThread;
