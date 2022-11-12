import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../../styles/layout/checkbox.module.scss";
import styles from "../../styles/modules/CreateProjectModal.module.scss";
import fetchJson from "../../lib/fetchJson";
import ToggleButton from "../ToggleButton/ToggleButton";

const ProjectCreationModal = ({ closeFunction }: { closeFunction: () => void }) => {
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  function clickHandler(e: any) {
    if (!e.target.closest(styles[".cc-modal-content"])) {
      closeFunction();
    } else {
    }
  }

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  useEffect(() => {
    console.log(isPrivate);
  }, [isPrivate]);

  const handleClick = async () => {
    const data = await fetchJson<Project>("/api/project/create", { method: "POST", body: JSON.stringify({ name, description, isPrivate }) });
    console.log(`data:\n\t${data}`);
  };

  return (
    <>
      <div
        id={styles["modal-background"]}
        className={styles["modal"]}
      >
        <div
          id={styles["my-modal"]}
          className={`${styles["modal"]} ${styles["cc-modal"]}`}
          onClick={clickHandler}
        >
          <div className={`${styles["cc-modal-content"]} ${styles["dark"]}`}>
            <div className={styles["cc-modal-body"]}>
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
              <ToggleButton setState={setIsPrivate} />
              <br />
              <button onClick={handleClick}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCreationModal;
