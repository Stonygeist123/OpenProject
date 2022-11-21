import styles from "./MessageBox.module.scss";

const MessageBox = ({ key, user, message }: { key: number; user: string; message: string }) => {
  return (
    <div className={styles["message-container"]} key={key}>
      <div className={styles["flex-container"]}>
        <div className={styles["user"]}>
          <div className={styles["user-profile-picture"]}></div>
          <p className={styles["username"]}>{user}</p>
        </div>
        <div className={styles["user-message"]}>
          <p>{message}</p>
          <div className={styles["message-options"]}>
            <span className={styles["reply-opt"]}>
              <strong>reply</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
