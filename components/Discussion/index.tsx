import DiscussionThread from "../DiscussionThread";
import styles from "./index.module.scss";
import arrowSvg from "../../public/arrow.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import { useRouter } from "next/router";
import fetchJson from "../../lib/fetchJson";

const Discussion = ({
  user,
  topLevel,
  messageInput,
  setMessageInput,
  setReload,
  onMessageSent,
  projectID,
  activeThreadID,
  setActiveThreadID,
}: {
  user: User | null;
  topLevel: Omit<Msg, "community">[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveThreadID: React.Dispatch<React.SetStateAction<number | null>>;
  onMessageSent?: () => unknown;
  projectID: number;
  activeThreadID: number | null;
}) => {
  const router = useRouter();
  const [replies, setReplies] = useState<Thread<true> | null>(null);

  useEffect(() => {
    fetchJson<{ message: string; found: boolean; allowed: boolean; thread: Thread<true> | null }>(`/api/project/${projectID}/message/threads`, {
      method: "POST",
      body: JSON.stringify({ topID: activeThreadID }),
    }).then(data => {
      setReplies(data.thread);
      console.log(data.thread?.replies.map(r => ({ ...r, community: null })) ?? []);
    });
  }, [activeThreadID]);

  useEffect(() => {
    if (router.isReady) setReload(false);
  }, [router.isReady, setReload]);

  return (
    <div className={`${styles["discussion"]}`}>
      <div className={styles["message-input-wrapper"]}>
        <textarea
          className={`${user === null ? styles["error"] : null} ${styles["message-input"]}`}
          placeholder={user === null ? "You need to be logged in." : "Send message..."}
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
          onKeyDown={async e => {
            if (e.key === "Tab") onMessageSent?.();
          }}
          disabled={user === null}
        />
        <Button
          size="m"
          onClick={onMessageSent}
          className={styles["message-send"]}
          disabled={user === null}
        >
          <Image
            alt="sendMessage"
            src={arrowSvg}
          />
        </Button>
      </div>

      <div className={styles["threads"]}>
        <DiscussionThread
          msgs={topLevel.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())}
          sub={false}
          setActiveID={setActiveThreadID}
          setReload={setReload}
          projectID={projectID}
        />

        {activeThreadID !== null ? (
          <DiscussionThread
            key={activeThreadID}
            msgs={
              replies?.replies
                .map(r => ({ ...r, community: null }))
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) ?? []
            }
            sub
            setActiveID={setActiveThreadID}
            setReload={setReload}
            activeID={activeThreadID}
            projectID={projectID}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Discussion;
