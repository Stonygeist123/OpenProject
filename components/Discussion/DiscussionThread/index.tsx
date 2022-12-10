import { useState, useEffect, useRef } from "react";
import MessageBox from "../../MessageBox/MessageBox";
import styles from "./DiscussionThread.module.scss";

const DiscussionThread = ({ messages }: { messages: [] }) => {
  const replies = messages;
  const [activeThread, setActiveThread] = useState<number | undefined>();
  const [focusView, setFocusView] = useState(false);
  const [renderThread, setRenderThread] = useState(false);

  const handleClick = (key: number) => {
    console.log("setting active thread with key: ", key);
    setActiveThread(key);
  };
  const getInactiveClass = (i: number) => {
    return i === activeThread ? "" : styles["dim"];
  };

  useEffect(() => {
    activeThread !== undefined &&
      (() => {
        setFocusView(true);
        setRenderThread(true);
      })();
    activeThread === undefined &&
      (() => {
        setFocusView(false);
        setRenderThread(false);
      })();
  }, [activeThread]);

  return (
    <div className="flex flex-row">
      <div>
        {messages.map((message, i) => (
          <button
            className={`my-1 ${styles["button"]} ${focusView && getInactiveClass(i)}`}
            onClick={() => {
              handleClick(i);
            }}
          >
            <MessageBox
              key={i}
              message={message}
            />
          </button>
        ))}
      </div>
      {renderThread && (
        <div className="ml-5">
          {replies.map(reply => (
            <div className="my-1">
              <MessageBox
                key={1}
                message={reply}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionThread;
