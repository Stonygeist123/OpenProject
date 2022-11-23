import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "../../lib/fetchJson";
import styles from "../../styles/pages/project/[id].module.scss";
import TaskBox from "../../components/TaskBox/TaskBox";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoaded, setProjectLoaded] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    fetchJson<{
      message: string;
      found: boolean;
      admin: boolean;
      project: Project | null;
    }>(`/api/project/${id}`).then(data => {
      setProject(data.project);
      setProjectLoaded(true);
    });
  }, [router, id]);

  useEffect(() => {
    console.log(`Project:\n\t`, project);
  }, [project]);

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
    <>
      <div className={styles["project-page"]}>
        <h1 className={styles["project-title"]}>{project.name}</h1>
        <div className={styles["tasks-container"]}>
          <TaskBox key={1} text={"small text"} />
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
// lemme redirect to project page after creating a proj from modal
// sure
