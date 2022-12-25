import Button from "../../common/Button";
import styles from "./index.module.scss";

const Footer = ({ onReply, message }: { onReply: () => void; message: Msg }) => {
  const formatDate = (d: Date) => {
    const y = new Date();
    if (y.toLocaleDateString() === d.toLocaleDateString()) return `Today - ${d.toLocaleTimeString()}`;

    y.setDate(y.getDate() - 1);
    if (y.toLocaleDateString() === d.toLocaleDateString()) return `Yesterday - ${d.toLocaleTimeString()}`;
    return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
  };
  return (
    <div className={`${styles["message-footer"]} flex flex-row px-1 `}>
      <div>
        <p className={`text-3xs ${styles["message-footer-date"]}`}>{formatDate(new Date(message.created_at))}</p>
      </div>
      <div className="flex-grow"></div>
      <div className={styles["reply-button-wrapper"]}>
        <Button
          className={`text-xs ${styles["reply-button"]}`}
          onClick={onReply}
          text="Reply"
        />
      </div>
    </div>
  );
};

export default Footer;
