import styles from "./MessageBox.module.scss";
import ProfileIcon from "../common/ProfileIcon/ProfileIcon";
import { NextRouter } from "next/router";

const MessageBox = ({
  key,
  message,
  isFirst = false,
  isLast = false,
  className,
}: {
  key: number;
  message: Message & { author: User; community: Community | null; project: Project | null };
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
  router?: NextRouter;
}) => {
  const formatDate = (d: Date) => {
    const y = new Date();
    if (y.toLocaleDateString() === d.toLocaleDateString()) return `Today - ${d.toLocaleTimeString()}`;

    y.setDate(y.getDate() - 1);
    if (y.toLocaleDateString() === d.toLocaleDateString()) return `Yesterday - ${d.toLocaleTimeString()}`;
    return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
  };

  return (
    <div
      className={`${styles["message-container"]} ${isFirst ? styles["first"] : isLast ? styles["last"] : null} ${className}`}
      key={key}
    >
      <div className="flex flex-row">
        <ProfileIcon
          className={styles["message-profile-icon"]}
          size="m"
        />
        <div className={styles["message-wrapper"]}>
          <div className={styles["message-content-wrapper"]}>
            <p className={`text-sm ${styles["message-content"]}`}>{message?.content}</p>
          </div>
          <p className={`font-bold text-3xs ${styles["message-footer"]}`}>
            {/* ToDo: Redirect to user profile when clicking on author's name */}
            Author: <span style={{ color: "black", cursor: "pointer" }}>{message?.username}</span>,{" "}
            <span className="text-3xs">{formatDate(new Date(message.created_at))}</span>
          </p>
        </div>
      </div>
      <div className={`${styles["message-footer"]}`}></div>
    </div>
  );
};

export default MessageBox;
