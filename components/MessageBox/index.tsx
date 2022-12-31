import styles from "./index.module.scss";
import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import fetchJson from "../../lib/fetchJson";
import Body from "./Body";
import Footer from "./Footer";
import ReplyBox from "./ReplyBox";
import Switch from "./Switch";

const MessageBox = ({
  key,
  message,
  isFirst = false,
  isLast = false,
  className,
  setReload,
  hasReplies,
  activeID,
  setActiveID,
  projectID,
}: {
  key: number;
  message: Msg;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  router?: NextRouter;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  hasReplies: boolean;
  activeID: number;
  setActiveID: React.Dispatch<React.SetStateAction<number | null>>;
  projectID: number;
}) => {
  const [replyOn, setReplyOn] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");
  const router = useRouter();

  const sendReply = async () => {
    await fetchJson(`/api/project/${message.projectId}/message/create`, {
      method: "POST",
      body: JSON.stringify({ content: messageInput.trim(), replyID: message.id }),
    });

    setMessageInput("");
    setReplyOn(false);
    setReload(true);
  };

  return (
    <>
      <div className={"flex flex-col " + `${styles["message-box-wrapper"]}`}>
        <div className="flex flex-row">
          <Switch
            id={message.id}
            activeId={activeID}
            handleSwitchClick={(e: React.SyntheticEvent) => {
              setActiveID(v => (v === message.id ? null : message.id));
              console.log(router.query);
              router.push({ pathname: `/project/${projectID}/message/${message.id}` }, undefined, {
                scroll: false,
              });
              e.preventDefault();
            }}
            hasReplies={hasReplies}
          />

          <div
            className={`${styles["message-container"]} ${isFirst ? styles["first"] : null} ${
              isLast ? styles["last"] : null
            } ${className} flex flex-col`}
            key={key}
          >
            <Body message={message} />
            <Footer
              onReply={() => setReplyOn(v => !v)}
              message={message}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-2"></div>
          {replyOn && (
            <ReplyBox
              messageInput={messageInput}
              handleChange={e => {
                const v = e.target.value;
                setMessageInput(v);
              }}
              handleKeyDown={e => {
                if (e.key === "Tab") sendReply();
              }}
              sendReply={sendReply}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBox;
