import { useState } from "react";
import ProfileIcon from "../../common/ProfileIcon/ProfileIcon";
import ProfileCard from "../../ProfileCard";
import styles from "./index.module.scss";

const Body = ({ message }: { message: Msg }) => {
  const [profile, setProfile] = useState(false);

  return (
    <>
      <div className="flex flex-row overflow-hidden justify-center content-center ">
        <div className="flex flex-col items-center">
          {profile ? <ProfileCard user={message.author} /> : null}
          <div onClick={() => setProfile(v => !v)}>
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
    </>
  );
};

export default Body;
