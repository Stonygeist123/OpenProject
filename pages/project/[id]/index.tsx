import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "../../../lib/fetchJson";
import styles from "../../../styles/pages/project/[id]/index.module.scss";
import TaskBox from "../../../components/TaskBox/TaskBox";
import Button from "../../../components/common/Button";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [tasks, setTasks] = useState<(Task & { project: Project })[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    fetchJson<{
      message: string;
      found: boolean;
      admin: boolean;
      project: (Project & { tasks: (Task & { project: Project })[] }) | null;
    }>(`/api/project/${id}`).then(data => {
      setProject(data.project);
      setProjectLoaded(true);

      if (data.project !== null) {
        fetchJson<{
          message: string;
          found: boolean;
          admin: boolean;
          messages: Message[] | null;
        }>(`/api/project/${id}/get_messages`).then(data => setMessages(data.messages));
        setTasks(data.project.tasks);
      }
    });

    fetchJson<{
      message: string;
      allowed: boolean;
      found: boolean;
      user: User | null;
    }>("/api/user").then(data => setUser(data.user));
  }, [router.isReady, id]);

  const handleCreateTask = () => router.push(`/project/${id}/task/add`);
  return !projectLoaded ? (
    <h1 style={{ color: "white", textAlign: "center", top: "10em", position: "relative" }}>Loading...</h1>
  ) : project === null ? (
    <h1 style={{ color: "white", textAlign: "center", top: "10em", position: "relative" }}>
      Could not find project with id{" "}
      <b>
        <code>{id}</code>
      </b>
      .
    </h1>
  ) : (
    <div className={styles["project-page"]}>
      <h2 className={styles["project-title"]}>{project.name}</h2>
      <div className={styles["content-wrapper"]}>
        <div className={styles["project-content"]}>
          <div className={styles["project-description"]}>
            <h3 className={styles["project-description-title"]}>Description</h3>
            <p className={styles["project-description-text-wrapper"]}>
              <code className={styles["project-description-text"]}>{project.description}</code>
            </p>
          </div>

          <div className={`${styles["tasks-container"]} ${styles["m-l-5"]}`}>
            {tasks.length > 0 ? (
              <div className={styles["tasks"]}>
                {tasks.map(t => (
                  <div
                    key={t.id}
                    className={styles["task"]}
                  >
                    <br />
                    <TaskBox
                      key={t.id}
                      task={t}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className={styles["tasks"]}></div>
                <h1 className="font-bold text-4x">No tasks yet...</h1>
              </>
            )}

            {user !== null ? (
              <div className={styles["create-task-button-wrapper"]}>
                <Button
                  isSubmit
                  size="m"
                  className={styles["create-task-button"]}
                  text="Create task"
                  onClick={handleCreateTask}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className={`${styles["messages-container"]}`}>
          {messages && messages.length > 0 ? (
            messages.map((m, i) => (
              <div
                className="message"
                key={i}
              >
                <p>{m.content}</p>
              </div>
            ))
          ) : (
            <>
              <textarea
                className={styles["message-input"]}
                onKeyDown={e => {
                  if (e.key === "Enter") router.reload();
                }}
              />
              <p style={{ color: "black", fontSize: "xx-large", fontWeight: "bolder", textAlign: "center", position: "relative" }}>
                No messages yet...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
