import Button from "../../common/Button";
import ToggleButton from "../../common/ToggleButton/ToggleButton";
import styles from "../../../styles/pages/project/create/index.module.scss";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

const ProjectStarter = () => {
  //   const { values, handleSubmit, handleChange, initialValues } = useFormikContext();

  const { values, handleChange } = useFormikContext<{ name: string; description: string }>();

  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [isPrivate, setPrivate] = useState(false);

  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  return (
    <>
      <h1 className={styles["title"]}> Create a new project! </h1>
      <div className={styles["content-wrapper"]}>
        <input
          className={styles["input"]}
          placeholder="Enter a name..."
          value={values.name}
          onChange={handleChange}
        />
        {/* {values.projectFound ? (
            <label style={{ color: "red" }}>Project &ldquo;{name}&rdquo; does already exist.</label>
          ) : values.nameProvided === values.Provided.No ? (
            <label style={{ color: "red" }}>No name provided.</label>
          ) : null} */}
        <div className={styles["input-wrapper"]}>
          <input
            className={styles["input"]}
            placeholder="Enter categories/tags"
            value={tag}
            name="name"
            onChange={e => {
              const val = e.target.value;
              setTag(val);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
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
                      <code className={styles["tag-text"]}>{t}</code>
                      <p
                        id={`tag-${i}`}
                        className={styles["tag-cross"]}
                        onClick={() => {
                          tags.splice(i, 1);
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
            value={values.description}
            onChange={handleChange}
          ></textarea>
          <ToggleButton
            setState={() => {
              setPrivate(v => !v);
            }}
            value={isPrivate}
            text="Set on private"
            className={styles["toggle-private-checkbox"]}
          />
        </div>
        <div className={styles["footer"]}>
          <div className={`${styles["button-container"]}`}>
            <Button
              isSubmit
              text="Next"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectStarter;
