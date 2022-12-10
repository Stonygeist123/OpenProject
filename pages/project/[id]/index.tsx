import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "../../../lib/fetchJson";
import styles from "../../../styles/pages/project/[id]/index.module.scss";
import TaskBox from "../../../components/TaskBox/TaskBox";
import Button from "../../../components/common/Button";
import MessageBox from "../../../components/MessageBox/MessageBox";
import sendArrowSvg from "../../../public/send_arrow.svg";
import Image from "next/image";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [messages, setMessages] = useState<(Message & { author: User; community: Community | null; project: Project | null })[]>([]);
  const [tasks, setTasks] = useState<(Task & { project: Project })[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");

  useEffect(() => {
    if (!router.isReady) return;

    fetchJson<{
      message: string;
      found: boolean;
      admin: boolean;
      project: (Project & { tasks: (Task & { project: Project })[] }) | null;
    }>(`/api/project/${id}`).then(async data => {
      setProject(data.project);

      if (data.project !== null) {
        await fetchJson<{
          message: string;
          found: boolean;
          admin: boolean;
          messages: (Message & { author: User; community: Community | null; project: Project | null })[] | null;
        }>(`/api/project/${id}/message/all`).then(data => setMessages(data.messages ?? []));

        setTasks(data.project.tasks);
      }

      fetchJson<{
        message: string;
        allowed: boolean;
        found: boolean;
        user: User | null;
      }>("/api/user").then(data => {
        setUser(data.user);
        setProjectLoaded(true);
      });
    });
  }, [router.isReady, id]);

  const handleCreateTask = () => router.push(`/project/${id}/task/add`);
  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    const { allowed, msg } = await fetchJson<{
      allowed: boolean;
      found: boolean;
      msg: (Message & { author: User; community: Community | null; project: Project | null }) | null;
      message: string;
    }>(`/api/project/${id}/message/create`, {
      method: "POST",
      body: JSON.stringify({ content: messageInput.trim(), region: id!, isProject: true }),
    });

    if (allowed && msg) {
      setMessages(m => [msg, ...m]);
      setMessageInput("");
    }
  };

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
            <div className={styles["project-description-text-wrapper"]}>
              <p className={`text-2x ${styles["project-description-text"]}`}>{project.description}</p>
            </div>
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
          <div className={styles["message-input-wrapper"]}>
            <textarea
              className={styles["message-input"]}
              placeholder={"Send message..."}
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              onKeyDown={async e => {
                if (e.key === "Tab") await handleSendMessage();
              }}
            />
            <Button
              size="m"
              onClick={handleSendMessage}
              className={styles["message-send"]}
            >
              <Image
                alt="sendMessage"
                src={sendArrowSvg}
              />
            </Button>
          </div>
          <div className={styles["messages"]}>
            {messages && messages.length > 0 ? (
              messages
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((m, i) => (
                  <MessageBox
                    className={styles["message"]}
                    message={m}
                    key={i}
                    isFirst={i === 0}
                    isLast={i + 1 === messages.length}
                  />
                ))
            ) : (
              <p
                className="text-xl"
                style={{ color: "black", fontWeight: "bolder", textAlign: "center", position: "relative" }}
              >
                No messages yet...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
