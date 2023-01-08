import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import styles from "./index.module.scss";

const Body = ({
  message,
  setProfileCard,
  msgRef,
}: {
  message: Msg;
  setProfileCard: React.Dispatch<React.SetStateAction<{ u: User; msg: React.RefObject<HTMLDivElement> } | null>>;
  msgRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <>
      <div className={`flex flex-row overflow-hidden justify-center content-center ${styles["body"]}`}>
        <div className={"flex flex-col items-center"}>
          <div onClick={() => setProfileCard(v => (v === null || v.u.name !== message.author.name ? { u: message.author, msg: msgRef } : null))}>
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
            <p className={`text-sm ${styles["message-content"]} scrollbar`}>{message?.content}</p>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </>
  );
};

export default Body;
