import styles from "./index.module.scss";
import ProfileIcon from "../common/ProfileIcon/ProfileIcon";
import { NextRouter } from "next/router";
import { useState } from "react";
import Button from "../common/Button";
import fetchJson from "../../lib/fetchJson";
// import arrowSvg from "../../public/arrow.svg";

const MessageBox = ({
  key,
  message,
  isFirst = false,
  isLast = false,
  className,
  setReload,
}: {
  key: number;
  message: Msg;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  router?: NextRouter;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const formatDate = (d: Date) => {
    const y = new Date();
    if (y.toLocaleDateString() === d.toLocaleDateString()) return `Today - ${d.toLocaleTimeString()}`;

    y.setDate(y.getDate() - 1);
    if (y.toLocaleDateString() === d.toLocaleDateString()) return `Yesterday - ${d.toLocaleTimeString()}`;
    return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
  };

  const [replyOn, setReplyOn] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");

  const sendReply = async () => {
    await fetchJson(`/api/project/${message.projectId}/message/create`, {
      method: "POST",
      body: JSON.stringify({ content: messageInput, replyID: message.id }),
    });

    setMessageInput("");
    setReload(true);
  };

  return (
    <>
      <div
        className={`${styles["message-container"]} ${isFirst ? styles["first"] : null} ${
          isLast ? styles["last"] : null
        } ${className} flex flex-col px-1`}
        key={key}
      >
        <div className="flex flex-row overflow-hidden justify-center content-center ">
          <div className="flex flex-col items-center">
            <div>
              <ProfileIcon
                className={styles["profile"]}
                size="m"
              />
              {/**
               *
               * ToDo: Redirect to user profile when clicking on author's name
               *
               **/}
              <p className={`text-3xs ${styles["author-name"]}`}>{message?.username}</p>
            </div>
          </div>

          <div className={`${styles["message-wrapper"]} `}>
            <div className={styles["message-content-wrapper"]}>
              <p className={`text-sm ${styles["message-content"]}`}>{message?.content}</p>
            </div>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className={`${styles["message-footer"]} flex flex-row pl-1 mt-1`}>
          <div>
            <p className={`text-3xs ${styles["message-footer-date"]}`}>{formatDate(new Date(message.created_at))}</p>
          </div>
          <div className="flex-grow"></div>
          <div className={styles["reply-button-wrapper"]}>
            <Button
              className={`text-xs ${styles["reply-button"]}`}
              onClick={() => setReplyOn(v => !v)}
              text="Reply"
            />
          </div>
        </div>

        {replyOn ? (
          <div className={`${styles["reply-container"]}`}>
            <div className={`${styles["reply-text-area-wrapper"]}`}>
              <textarea
                className={`${styles["reply-text-area"]}`}
                value={messageInput}
                onChange={e => setMessageInput(e.target.value.trim())}
                onKeyDown={e => {
                  if (e.key === "Tab") sendReply();
                }}
              />
            </div>
            <div className="reply-container-footer">
              <Button
                className={`${styles["send-reply-button"]} mt-1`}
                size="s"
                text="Send reply"
                onClick={sendReply}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MessageBox;
