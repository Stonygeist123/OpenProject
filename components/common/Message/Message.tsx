import { ReactPropTypes } from "react";
import styles from "./Message.module.scss";
import Link from "next/link";

const placeholderText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla aliquid voluptate dolor accusamus modi minima, vel vitae sunt sed illo molestias quas? Deserunt fugiat, asperiores voluptate et non dolorem doloribus!";

type MessageProps = ReactPropTypes & {
  username?: string;
  timeStamp?: string;
};
const Message = ({ username = "username", timeStamp = "12/08/2022", ...props }: MessageProps) => {
  return (
    <div className={styles["message"]}>
      <div className={styles["message-header"]}>
        <span className={styles["username"]}>
          <Link href={"/" + username} className={`${styles["username"]}`}>
            {username}
          </Link>
        </span>
      </div>
      <p className="message-body">{placeholderText}</p>
      <div className={styles["message-footer"]}></div>
    </div>
  );
};

export default Message;
