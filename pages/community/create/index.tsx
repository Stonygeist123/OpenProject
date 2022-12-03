import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import fetchJson from "../../../lib/fetchJson";
import { Provided } from "../../../utils/utils";
import styles from "../../../styles/pages/project/create/index.module.scss";

const CommunityCreationPage = () => {
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [communityFound, setCommunityFound] = useState(false);
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
        community: Community | null;
        message: string;
      }>("/api/community/create", {
        body: JSON.stringify({ name, description }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.allowed) router.push(`/community/${data.community!.name}`);
      else if (data.found) setCommunityFound(true);
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
            {communityFound ? (
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
                    if ((tag + e.key).split("").some(s => parseInt(s) === NaN && !s.match(/[a-zA-Z]/i) && s !== "-" && s !== "_" && s !== " "))
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
            </div>
            <div className={styles["footer"]}>
              <Button className={styles["submit-button"]} onClick={handleOnClick} size="xl">
                Submit
              </Button>
            </div>
          </div>
        </>
      ) : (
        <h1 className={styles["title"]}> You need to be logged in! </h1>
      )}
    </div>
  );
};

export default CommunityCreationPage;
