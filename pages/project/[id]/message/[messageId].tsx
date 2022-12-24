import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "../../../../lib/fetchJson";
import styles from "../../../../styles/pages/project/[id]/index.module.scss";
import TaskBox from "../../../../components/TaskBox/TaskBox";
import Button from "../../../../components/common/Button";
import Discussion from "../../../../components/Discussion";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [topLevel, setTopLevel] = useState<Omit<Msg, "community">[]>([]);
  const [tasks, setTasks] = useState<(Task & { project: Project })[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loadDiscussion, setLoadDiscussion] = useState(true);
  const [messageInput, setMessageInput] = useState<string>("");
  const [activeThreadId, setActiveThreadID] = useState<number | null>(null);

  const handleMessageSent = async () => {
    if (user === null) return;
    if (messageInput.trim() === "") return;

    await fetchJson(`/api/project/${id}/message/create`, { method: "POST", body: JSON.stringify({ content: messageInput, replyID: null }) });
    setMessageInput("");
    setLoadDiscussion(true);
  };

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
        setTasks(data.project.tasks);

        await fetchJson<{
          message: string;
          found: boolean;
          allowed: boolean;
          threads: Thread<true>[];
        }>(`/api/project/${id}/message/threads`);
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

  useEffect(() => {
    if (!router.isReady || !loadDiscussion) return;

    fetchJson<{
      message: string;
      found: boolean;
      allowed: boolean;
      messages: Omit<Msg, "community">[];
    }>(`/api/project/${id}/message/top_level`).then(({ messages: msgs }) => {
      setTopLevel(msgs);
      setLoadDiscussion(v => !v);
    });
  }, [id, loadDiscussion, router.isReady]);

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
            <h1> this is the page for message within project</h1>
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
                    {/* easy. just pass setAtiveThreadId to discussion, yeah and also activeThreadId so it can display the correct one */}
                    {/* already done */}
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

        {loadDiscussion ? (
          <Discussion
            topLevel={topLevel}
            user={user}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            setReload={setLoadDiscussion}
            onMessageSent={handleMessageSent}
            projectID={parseInt(id as string)}
            activeThreadID={activeThreadId}
            setActiveThreadID={setActiveThreadID}
          />
        ) : (
          <Discussion
            topLevel={topLevel}
            user={user}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            setReload={setLoadDiscussion}
            onMessageSent={handleMessageSent}
            projectID={parseInt(id as string)}
            activeThreadID={activeThreadId}
            setActiveThreadID={setActiveThreadID}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
