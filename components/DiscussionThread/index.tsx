import MessageBox from "../MessageBox";
import NotFound from "../NotFound";
import styles from "./index.module.scss";
import Image from "next/image";

const DiscussionThread = ({
  msgs,
  sub = false,
  className,
  setActiveID,
  setReload,
  activeID,
  projectID,
}: {
  changeThread?: () => {};
  msgs: Omit<Msg, "community">[];
  sub?: boolean;
  className?: string;
  activeID?: number | null;
  setActiveID?: React.Dispatch<React.SetStateAction<number | null>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  projectID: number;
}) =>
  !activeID && sub ? (
    <NotFound />
  ) : (
    <div
      className={`flex flex-col ${styles["thread"]} ${sub ? styles["subthread"] : null} ${
        msgs.length === 0 ? styles["no-switch"] : null
      } ${className}`}
    >
      {sub ? (
        <Image
          src={"/arrow.svg"}
          width={20}
          height={20}
          alt="Stepback"
          style={{ transform: "rotate(180deg)" }}
        />
      ) : null}
      {msgs.map((m, i) => (
        <div
          key={i}
          className={styles["message-container"]}
        >
          <MessageBox
            key={m.id}
            message={{ ...m, community: null }}
            isFirst={i === 0}
            isLast={i + 1 >= msgs.length}
            setReload={setReload}
            hasReplies={m.hasReplies}
            activeID={activeID}
            setActiveID={setActiveID!}
            projectID={projectID}
          />
        </div>
      ))}
    </div>
  );

export default DiscussionThread;
