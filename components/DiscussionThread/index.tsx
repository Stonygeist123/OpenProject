import MessageBox from "../MessageBox";
import styles from "./index.module.scss";
import Image from "next/image";

const DiscussionThread = ({
  msgs,
  sub = false,
  className,
  setSubthreadID,
  setReload,
  subthreadID,
}: {
  changeThread?: () => {};
  msgs: Omit<Msg, "community">[];
  sub?: boolean;
  className?: string;
  subthreadID: number | null;
  setSubthreadID: React.Dispatch<React.SetStateAction<number | null>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div
    className={`flex flex-col ${styles["thread"]} ${sub ? styles["subthread"] : null} ${msgs.length === 0 ? styles["no-switch"] : null} ${className}`}
  >
    {sub ? (
      <Image
        src={"/arrow.svg"}
        width={20}
        height={20}
        alt="Stepback"
        // we can save the old subthreadID as a separate state in the discussion component and render that one after stepping back
        // isn't this a bit complicated?
        // another way would be to use the url and track the id of the active thread and use browser history to go back
        // /message/id
        // u can try that. i'll watch
        // in some ways but less in other ways, it means we would have to track less state
        // and the user can click on the back button to go back to previous threads.
        // ok but let's discuss whether it is good if the user clicks on the back button then he sees the previous thread
        // rather than going to the previous page, would it be okay in terms of the user experience.
        // like if you click on the back button on the browser would you want it to go back to the previous message view or back to the home page if that was the previous page
        // so did my previous msgs reach u? I don't think so
        // ok. i said u can decide since we'll look later on what we wanna change
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
          activeID={subthreadID ?? -1}
          setActiveID={setSubthreadID}
        />
      </div>
    ))}
  </div>
);

export default DiscussionThread;
