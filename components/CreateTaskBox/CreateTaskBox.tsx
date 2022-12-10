import React, { useState } from "react";
import styles from "./CreateTaskBox.module.scss";
import Button from "../common/Button";
import fetchJson from "../../lib/fetchJson";
import { useRouter } from "next/router";

type CreateTaskBoxProps = {
  className?: string;
  value?: string;
  onChange?: () => {};
  projectId: number;
};

const CreateTaskBox = ({ className, value, onChange, projectId }: CreateTaskBoxProps) => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nameProvided, setNameProvided] = useState<boolean | null>(null);
  const [descProvided, setDescProvided] = useState<boolean | null>(null);
  const [preqs, _] = useState<Array<{ title: string; description: string }>>([]);

  const handleOnClickPreqs = () => {};
  const handleOnCSubmit = async () => {
    if (!nameProvided) return setNameProvided(false);
    if (!descProvided) return setDescProvided(false);

    await fetchJson(`/api/project/${projectId}/task/create`, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        projectId,
        preqs,
      }),
    });

    router.push(`/project/${projectId}`);
  };

  return (
    <>
      <div className={`${styles["container"]} ${className}`}>
        <div className={`flex flex-row align-center`}>
          <span className={`${styles["container-title"]} font-normal w-12`}>Task</span>
          <input
            className={`${styles["container-input"]} flex-grow`}
            value={value}
            onChange={e => {
              onChange?.();
              const v = e.target.value.trim();
              setName(v);
              setNameProvided(v !== "");
            }}
          ></input>
          {nameProvided === false ? (
            <label
              className="text-md"
              style={{ color: "red" }}
            >
              No name provided.
            </label>
          ) : null}
          <div className={`${styles["container-button-wrapper"]} w-12`}>
            <Button
              onClick={handleOnClickPreqs}
              className={`${styles["container-button"]} font-normal`}
              size="s"
            >
              Prerequisites
            </Button>
          </div>
        </div>
        <div className="flex">
          <p className={`w-12 text-center mt-2 text-lg font-lighter`}>Description</p>
          <div className={`${styles["container-textarea-wrapper"]} flex-grow mt-1`}>
            <textarea
              onChange={e => {
                const v = e.target.value.trim();
                setDescription(v);
                setDescProvided(v !== "");
              }}
              value={description}
              className={`mt-1 ${styles["container-textarea"]}`}
            />
            {descProvided === false ? (
              <label
                className="text-md"
                style={{ color: "red" }}
              >
                No description provided.
              </label>
            ) : null}
          </div>
          <div className={`w-12`}></div>
          <Button
            isSubmit
            text="Create"
            onClick={handleOnCSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default CreateTaskBox;
