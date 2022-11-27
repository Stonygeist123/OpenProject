import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import useCloseFunction from "../../components/Modals/utils/OutsideAlerter";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import fetchJson from "../../lib/fetchJson";
import { Provided } from "../../utils/utils";
import styles from "../../styles/pages/project/create.module.scss";

const ProjectCreationPage = ({ closeFunction }: { closeFunction: () => void }) => {
  const someRef = useRef(null);
  useCloseFunction(someRef, closeFunction);
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [projectFound, setProjectFound] = useState(false);
  const [nameProvided, setNameProvided] = useState<Provided>(Provided.NotLoaded);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleOnClick = async () => {
    if (nameProvided !== Provided.No) {
      setNameProvided(Provided.Yes);
      const data = await fetchJson<{
        allowed: boolean;
        found: boolean;
        project: Project | null;
        message: string;
      }>("/api/project/create", {
        body: JSON.stringify({ name, description, isPrivate }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data.message);
      if (data.allowed) router.push(`/project/${data.project!.id}`);
      else if (data.found) setProjectFound(true);
    }
  };

  useEffect(() => {
    fetchJson<{ user: UserSession | null }>("/api/user/get_session").then(data => {
      setLogged(data.user !== null);
      setLoading(false);
    });
  }, [loading]);

  useEffect(() => {
    if (!loading) setNameProvided(name.trim().length === 0 ? Provided.No : Provided.Yes);
  }, [name, loading]);

  return (
    <div className={styles["page-content"]} ref={someRef}>
      {loading ? (
        <h1 className={styles["title"]}> Loading... </h1>
      ) : logged ? (
        <>
          <h1 className={styles["title"]}> Create a new project! </h1>
          <div className={styles["content-wrapper"]}>
            <input className={styles["input"]} value={name} onChange={e => setName(e.target.value)} placeholder="Enter a name..." />
            {projectFound ? (
              <label style={{ color: "red" }}>Project &ldquo;{name}&rdquo; does already exist.</label>
            ) : nameProvided === Provided.No ? (
              <label style={{ color: "red" }}>No name provided.</label>
            ) : null}
            <div className={styles["input-wrapper"]}>
              <input
                className={styles["input"]}
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
                          <p
                            id={`tag-${i}`}
                            className={styles["tag-cross"]}
                            onClick={() => {
                              tags[i] = null;
                              setTags(tags.filter(t => t !== null));
                            }}
                          >
                            ×
                          </p>
                        </div>
                      </>
                    ))}
              </div>
            </div>
            <div>
              <textarea
                className={styles["description-input"]}
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

          <span className={styles["close"]} onClick={closeFunction}>
            &times;
          </span>
        </>
      ) : (
        <h1 className={styles["title"]}> You need to be logged in! </h1>
      )}
    </div>
  );
};

export default ProjectCreationPage;
