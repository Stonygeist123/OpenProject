import DiscussionThread from "../DiscussionThread";
import styles from "./index.module.scss";
import arrowSvg from "../../public/arrow.svg";
import Image from "next/image";
import fetchJson from "../../lib/fetchJson";
import { useState } from "react";
import Button from "../common/Button";

const Discussion = ({ threads, id }: { threads: Thread<true>[]; id: number }) => {
  const [messageInput, setMessageInput] = useState<string>("");
  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    const { allowed, threads: ts } = await fetchJson<{
      message: string;
      found: boolean;
      allowed: boolean;
      threads: Thread<true>[];
    }>(`/api/project/${id}/message/threads`, {
      method: "POST",
      body: JSON.stringify({ content: messageInput.trim(), region: id!, isProject: true }),
    });

    if (allowed && ts.length > 0) {
      threads = ts;
      setMessageInput("");
    }
  };

  return (
    <div className={`${styles["discussion"]}`}>
      <div className={styles["message-input-wrapper"]}>
        <textarea
          className={styles["message-input"]}
          placeholder={"Send message..."}
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
          onKeyDown={async e => {
            if (e.key === "Tab") await handleSendMessage();
          }}
        />
        <Button
          size="m"
          onClick={handleSendMessage}
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
