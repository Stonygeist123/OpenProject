import styles from "./ProjectCreationModal2.module.scss";
import { useRef, useState } from "react";
import useCloseFunction from "./OutsideAlerter";
import Image from "next/image";
// import ToggleButton from "../ToggleButton/ToggleButton";

const ProjectCreationModal2 = ({ closeFunction }: { closeFunction: () => void }) => {
  const someRef = useRef(null);
  useCloseFunction(someRef, closeFunction);
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [isPrivate, setIsPrivate] = useState(true);

  return (
    <div
      id={styles["myModal"]}
      className={styles["modal"]}
    >
      <div
        className={styles["modal-content"]}
        ref={someRef}
      >
        <h1 className={styles["cc-title"]}> Create a new project! </h1>
        <input
          className={styles["cc-title-input"]}
          placeholder="Enter a name"
        />
        <div className={styles["input-wrapper"]}>
          <input
            className={styles["cc-title-input tag-input"]}
            placeholder="Enter categories/tags"
            onChange={e => setName(e.currentTarget.value)}
            value={name}
            onKeyDown={e => {
              if (e.key === "Tab" || e.key === "Enter") {
                console.log(`${e.key} pressed`);
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
            className={styles["project-description-text-area"]}
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.currentTarget.value)}
          ></textarea>
        </div>
        <br />
        {/* <ToggleButton setState={setIsPrivate} /> */}
        <br />
        <button onClick={() => console.log("submit called")}>Submit</button>

        <span
          className={styles["close"]}
          onClick={() => closeFunction()}
        >
          &times;
        </span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
};

export default ProjectCreationModal2;

// the changes with the button component
// are they on main now? I mean development
// idk
// can you open another terminal?
// did
