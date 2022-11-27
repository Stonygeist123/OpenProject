import styles from "../../styles/modules/CommunityCreationModal.module.scss";
import { useRef, useState } from "react";
import useCloseFunction from "./utils/OutsideAlerter";
import Button from "../Button";
import fetchJson from "../../lib/fetchJson";

const CommunityCreationModal = ({ closeFunction }: { closeFunction: () => void }) => {
  const someRef = useRef(null);
  useCloseFunction(someRef, closeFunction);
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const handleOnClick = async () => {
    if (name.trim().length == 0) console.log("No name provided");
    else {
      console.log(
        await fetchJson("/api/community/create", {
          body: JSON.stringify({ name, description }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    }
  };

  return (
    <div id={styles["myModal"]} className={styles["modal"]}>
      <div className={styles["modal-content"]} ref={someRef}>
        <h1 className={styles["modal-title"]}> Create a new community! </h1>
        <div className={styles["content-wrapper"]}>
          <input className={styles["modal-input"]} value={name} onChange={e => setName(e.target.value)} placeholder="Enter a name..." />
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["modal-input"]}
              placeholder="Enter categories/tags"
              onChange={e => {
                const value = e.target.value;
                setTag(value);
              }}
              value={tag}
              onKeyDown={e => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  if (tags.includes(tag) || tag.trim() === "") return;
                  setTag("");
                  setTags(ts => [...ts, tag.trim()]);
                }
              }}
            />
            <div className={styles["tags"]}>
              {tags.length === 0
                ? null
                : tags.map((t, i) => (
                    <>
                      <div className={styles["tag"]}>
                        <code className={styles["tag-text"]}>
                          {t}{" "}
                          <p
                            style={{ cursor: "pointer" }}
                            id={`tag-${i}`}
                            className={styles["tag-cross"]}
                            onClick={() => {
                              tags[i] = null;
                              setTags(tags.filter(t => t !== null));
                            }}
                          >
                            x
                          </p>
                        </code>
                      </div>
                    </>
                  ))}
            </div>
          </div>
          <div>
            <textarea
              className={styles["modal-description-input"]}
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.currentTarget.value)}
            ></textarea>
          </div>
          <br />
        </div>
        <div className={styles["footer"]}>
          <Button onClick={handleOnClick} className={styles["submit-button"]} size="xl">
            Submit
          </Button>
        </div>

        <span className={styles["close"]} onClick={() => closeFunction()}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default CommunityCreationModal;
