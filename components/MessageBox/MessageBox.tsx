import styles from "./MessageBox.module.scss";

import ProfileIcon from "../common/ProfileIcon/ProfileIcon";
import { useEffect } from "react";
const MessageBox = ({ key, message }: { key: number; message: Message & { author: User; community: Community | null; project: Project | null } }) => {
  useEffect(() => {
    console.log(message);
    console.log("Message box rendering");
  }, [message]);

  const created_at = new Date(message.created_at);

  const formatDate = (d: Date) => {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    if (y.toLocaleDateString() === d.toLocaleDateString()) return "Yesterday";

    y.setDate(y.getDate() + 1);
    if (y.toLocaleDateString() === d.toLocaleDateString()) return "Today";
    return d.toLocaleDateString();
  };

  return (
    <div
      className={styles["message-container"]}
      key={key}
    >
      <div className="flex flex-row">
        <ProfileIcon />
        <div className={styles["message-container-content"]}>
          <div className={`text-md ${styles["message-content"]}`}>{message?.content}</div>
          <div className={`${styles["message-footer"]}`}>
            <p>
              Author: {message?.username},<span style={{ color: "gray" }}>{formatDate(created_at)}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={`${styles["message-footer"]}`}></div>
    </div>
  );
};

export default MessageBox;
