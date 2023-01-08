import styles from "./index.module.scss";
import Button from "../../common/Button";

const ReplyBox = ({
  messageInput,
  handleChange,
  handleKeyDown,
  sendReply,
}: {
  messageInput: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendReply: () => void;
}) => {
  return (
    <>
      <div className={`${styles["reply-container"]}`}>
        <div className={`${styles["reply-text-area-wrapper"]}`}>
          <textarea
            className={`${styles["reply-text-area"]} scrollbar`}
            value={messageInput}
            onChange={handleChange}
            // e => setMessageInput(e.target.value)
            onKeyDown={handleKeyDown}
            // e => {
            //   if (e.key === "Tab") sendReply();
            // }
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
    </>
  );
};

export default ReplyBox;
