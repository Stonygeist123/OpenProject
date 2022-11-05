import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../../styles/layout/checkbox.module.scss";
import styles from "../../styles/modules/CreateCommunityModal.module.scss";

const ProjectCreationModal = ({
  closeFunction,
}: {
  closeFunction: () => void;
}) => {
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [tagText, setTagText] = useState("");

  function clickHandler(e: any) {
    if (!e.target.closest(".cc-modal-content")) closeFunction();
  }

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <>
      <div
        id={styles["my-modal"]}
        className={`${styles["modal"]} ${styles["modal-shown"]} ${styles["cc-modal"]}`}
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
                onChange={e => setTagText(e.currentTarget.value)}
                value={tagText}
                onKeyDown={e => {
                  if (e.key === "Tab" || e.key === "Enter") {
                    console.log(`${e.key} pressed`);
                    e.preventDefault();
                    if (tags.includes(tagText) || tagText.trim() === "") return;

                    setTags(ts => [...ts, tagText.trim()]);
                    setTagText("");
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
                className={styles["community-description-text-area"]}
                placeholder="Description"
              ></textarea>
            </div>
            <br />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCreationModal;
