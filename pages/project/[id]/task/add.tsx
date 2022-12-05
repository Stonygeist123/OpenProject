import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateTaskBox from "../../../../components/CreateTaskBox/CreateTaskBox";
import fetchJson from "../../../../lib/fetchJson";
import styles from "../../../../styles/pages/project/[id]/task/add.module.scss";

const AddTasksPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    fetchJson<{ project: Project | null }>(`/api/project/${id}`).then(data => {
      setProject(data.project);
      setLoading(false);
    });
  }, [router.isReady, id]);

  if (loading)
    return (
      <h1
        className="text-xxl"
        style={{ color: "white", textAlign: "center", position: "relative", top: "40rem" }}
      >
        Loading.
      </h1>
    );

  if (typeof id !== "string" || isNaN(parseInt(id)))
    return (
      <h1
        className="text-xxl"
        style={{ color: "red", textAlign: "center", position: "relative", top: "40rem" }}
      >
        Expected id to be a number.
      </h1>
    );

  return project === null ? (
    <h1
      className="text-xxl"
      style={{ color: "red", textAlign: "center", position: "relative", top: "40rem" }}
    >
      Project with id &ldquo;{id}&rdquo; not found.
    </h1>
  ) : (
    <div className={styles["wrapper"]}>
      <h1 className={styles["heading"]}>Heading</h1>

      <div className={styles["container"]}>
        <CreateTaskBox
          projectId={parseInt(id)}
          className={styles["task"]}
        />
      </div>
    </div>
  );
};

export default AddTasksPage;
