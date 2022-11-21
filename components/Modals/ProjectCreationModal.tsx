import styles from "../../styles/modules/ProjectCreationModal.module.scss";
import { useRef, useState } from "react";
import useCloseFunction from "./utils/OutsideAlerter";
import Image from "next/image";
import Button from "../Button";
import ToggleButton from "../ToggleButton/ToggleButton";
import fetchJson from "../../lib/fetchJson";

const ProjectCreationModal = ({ closeFunction }: { closeFunction: () => void }) => {
  const someRef = useRef(null);
  useCloseFunction(someRef, closeFunction);
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleOnClick = async () => {
    if (name.trim().length == 0) console.log("No name provided");
    else {
      await fetchJson("/api/project/create", {
        body: JSON.stringify({ name, description, isPrivate }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  return (
    <div id={styles["myModal"]} className={styles["modal"]}>
      <div className={styles["modal-content"]} ref={someRef}>
        <h1 className={styles["modal-title"]}> Create a new project! </h1>
        <div className={styles["content-wrapper"]}>
          <input className={styles["modal-input"]} value={name} onChange={e => setName(e.target.value)} placeholder="Enter a name..." />
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["modal-input"]}
              placeholder="Enter categories/tags"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (tags.includes(name) || name.trim() === "") return;

                  setTags(ts => [...ts, name.trim()]);
                  setName("");
                }
              }}
            />
            <div className={styles["tags"]}>
              {tags.length === 0
                ? null
                : tags.map((t, i) => (
                    <>
                      <div className={styles["tag"]}>
                        <code className={styles["tag-text"]}>{t}</code>
                        <Image
                          alt="tag"
                          id={`tag-${i}`}
                          className={styles["tag-cross"]}
                          src="https://upload.wikimedia.org/wikipedia/commons/8/8e/OS_X-Logo.svg"
                          onClick={() => {
                            tags[i] = null;
                            setTags(tags.filter(t => t !== null));
                          }}
                        />
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
          <ToggleButton setState={setIsPrivate} value={isPrivate} text="Set on private" />
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

export default ProjectCreationModal;
