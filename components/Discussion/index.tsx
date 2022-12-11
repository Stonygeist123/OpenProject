import DiscussionThread from "../DiscussionThread";
import styles from "./index.module.scss";

const Discussion = ({ threads }: { threads: Thread<true>[] }) => {
  return (
    <div className={`flex flex-row ${styles["discussion"]}`}>
      <div className={styles["threads"]}>
        {threads
          .slice(20)
          .sort((a, b) => new Date(b.top.created_at).getTime() - new Date(a.top.created_at).getTime())
          .map((thread, i, arr) => (
            <DiscussionThread
              key={thread.top.id}
              thread={thread}
              sub={false}
              isFirst={i === 0}
              isLast={i + 1 === arr.length}
            />
          ))}
      </div>
    </div>
  );
};

export default Discussion;
