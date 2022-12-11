import DiscussionThread from "../DiscussionThread";
import styles from "./index.module.scss";
import arrowSvg from "../../public/arrow.svg";
import Image from "next/image";
import { useEffect } from "react";
import Button from "../common/Button";
import { useRouter } from "next/router";

const Discussion = ({
  threads,
  messageInput,
  setMessageInput,
  setReload,
  setReplyID,
  onMessageSent,
}: {
  threads: Thread<true>[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
  setReplyID?: React.Dispatch<React.SetStateAction<number | undefined>>;
  onMessageSent?: () => unknown;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) setReload?.(false);
  }, [router.isReady]);

  return (
    <div className={`${styles["discussion"]}`}>
      <div className={styles["message-input-wrapper"]}>
        <textarea
          className={styles["message-input"]}
          placeholder={"Send message..."}
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
          onKeyDown={async e => {
            if (e.key === "Tab") onMessageSent?.();
          }}
        />
        <Button
          size="m"
          onClick={onMessageSent}
          className={styles["message-send"]}
        >
          <Image
            alt="sendMessage"
            src={arrowSvg}
          />
        </Button>
      </div>

      <div className={styles["threads"]}>
        {threads
          .sort((a, b) => new Date(b.top.created_at).getTime() - new Date(a.top.created_at).getTime())
          .map((thread, i, arr) => (
            <DiscussionThread
              key={thread.top.id}
              thread={thread}
              sub={false}
              isFirst={i === 0}
              isLast={i + 1 === arr.length}
              setReply={setReplyID}
            />
          ))}
      </div>
    </div>
  );
};

export default Discussion;
