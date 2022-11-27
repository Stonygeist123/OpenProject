import styles from "../../styles/modules/CommunityCreationModal.module.scss";
import { useEffect, useRef, useState } from "react";
import useCloseFunction from "./utils/OutsideAlerter";
import Button from "../Button";
import fetchJson from "../../lib/fetchJson";
import { Provided } from "../../utils/utils";
import { useRouter } from "next/router";

const CommunityCreationModal = ({ closeFunction }: { closeFunction: () => void }) => {
  const someRef = useRef(null);
  useCloseFunction(someRef, closeFunction);
  const [tags, setTags] = useState<Array<string | null>>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
<<<<<<< HEAD
  const [communityFound, setCommunityFound] = useState(false);
  const [nameProvided, setNameProvided] = useState<Provided>(Provided.NotLoaded);
  const [nameInput, setNameInput] = useState(false);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

=======
>>>>>>> 1b387b4d620ad6d4812eb2dc0f77692bfba70878
  const handleOnClick = async () => {
    if (nameProvided !== Provided.No) {
      setNameProvided(Provided.Yes);
      const data = await fetchJson<{
        allowed: boolean;
        found: boolean;
        project: Project | null;
        message: string;
      }>("/api/community/create", {
        body: JSON.stringify({ name, description }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data.message);
      if (data.allowed) router.push(`/project/${data.project!.id}`);
      else if (data.found) setCommunityFound(true);
    }
  };

  useEffect(() => {
    fetchJson<{ user: UserSession | null }>("/api/user/get_session").then(data => {
      setLogged(data.user !== null);
      setLoading(false);
    });
  }, [loading]);

  useEffect(() => {
    if (!loading && nameInput) setNameProvided(name.trim().length === 0 ? Provided.No : Provided.Yes);
  }, [name, loading, nameInput]);

  return (
    <div id={styles["myModal"]} className={styles["modal"]}>
      <div className={styles["modal-content"]} ref={someRef}>
<<<<<<< HEAD
        {loading ? (
          <h1 className={styles["modal-title"]}> Loading... </h1>
        ) : logged ? (
          <>
            <h1 className={styles["modal-title"]}> Create a new community! </h1>
            <div className={styles["content-wrapper"]}>
              <input
                className={styles["modal-input"]}
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setNameInput(true);
                }}
                placeholder="Enter a name..."
              />
              {communityFound ? (
                <label style={{ color: "red" }}>Community &ldquo;{name}&rdquo; does already exist.</label>
              ) : nameProvided === Provided.No ? (
                <label style={{ color: "red" }}>No name provided.</label>
              ) : null}
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
                      setTags(ts => [...ts, tag.trim() + " "]);
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
=======
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
>>>>>>> 1b387b4d620ad6d4812eb2dc0f77692bfba70878
            </div>

            <span className={styles["close"]} onClick={() => closeFunction()}>
              &times;
            </span>
          </>
        ) : (
          <h1 className={styles["modal-title"]}> You need to be logged in! </h1>
        )}
      </div>
    </div>
  );
};

export default CommunityCreationModal;
