import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import ToggleButton from "../../../components/common/ToggleButton/ToggleButton";
import fetchJson from "../../../lib/fetchJson";
import { Provided } from "../../../utils/utils";
import styles from "../../../styles/pages/project/create/index.module.scss";

const ProjectCreationPage = () => {
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [projectFound, setProjectFound] = useState(false);
  const [nameProvided, setNameProvided] = useState<Provided>(Provided.NotLoaded);
  const [nameInput, setNameInput] = useState(false);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unexpected, setUnexpected] = useState(false);
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

      if (data.allowed) router.push(`/project/${data.project!.id}`);
      else if (data.found) setProjectFound(true);
    }
  };

  useEffect(() => {
    fetchJson<{ user: UserSession | null }>("/api/user/account/get_session").then(data => {
      setLogged(data.user !== null);
      setLoading(false);
    });
  }, [loading]);

  useEffect(() => {
    if (!loading && nameInput) setNameProvided(name.trim().length === 0 ? Provided.No : Provided.Yes);
  }, [name, loading, nameInput]);

  return (
    <div className={styles["page-content"]}>
      {loading ? (
        <h1 className={styles["title"]}> Loading... </h1>
      ) : logged ? (
        <>
          <h1 className={styles["title"]}> Create a new project! </h1>
          <div className={styles["content-wrapper"]}>
            <input
              className={styles["input"]}
              value={name}
              onChange={e => {
                setName(e.target.value);
                setNameInput(true);
              }}
              placeholder="Enter a name..."
            />
            {projectFound ? (
              <label style={{ color: "red" }}>Project &ldquo;{name}&rdquo; does already exist.</label>
            ) : nameProvided === Provided.No ? (
              <label style={{ color: "red" }}>No name provided.</label>
            ) : null}
            <div className={styles["input-wrapper"]}>
              <input
                className={styles["input"]}
                placeholder="Enter categories/tags"
                onChange={e => {
                  const value = e.target.value;
                  setTag(value);
                }}
                value={tag}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    if ((tag + e.key).split("").some(s => isNaN(parseInt(s)) && !s.match(/[a-zA-Z]/i) && s !== "-" && s !== "_" && s !== " "))
                      return setUnexpected(true);
                    else setUnexpected(false);

                    e.preventDefault();
                    if (tags.includes(tag) || tag.trim() === "") return;
                    setTag("");
                    setTags(ts => [...ts, tag.trim() + " "]);
                  }
                }}
              />
              {unexpected ? (
                <label style={{ color: "red" }}>
                  Tag must match following pattern: <code>a-zA-Z1-9-_ </code>.
                </label>
              ) : null}
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
              <ToggleButton
                setState={setIsPrivate}
                value={isPrivate}
                text="Set on private"
                className={styles["toggle-private-checkbox"]}
              />
            </div>
            <div className={styles["footer"]}>
              <div className={`${styles["button-container"]}`}>
                <Button
                  isSubmit
                  onClick={handleOnClick}
                />
                <Button
                  isSubmit
                  text="Next"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className={styles["title"]}> You need to be logged in! </h1>
      )}
    </div>
  );
};

export default ProjectCreationPage;
