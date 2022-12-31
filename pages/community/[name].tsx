import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "../../lib/fetchJson";
import styles from "../../styles/pages/project/[id].module.scss";

const ProjectPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    fetchJson<{
      message: string;
      found: boolean;
      admin: boolean;
      project: Project | null;
    }>(`/api/community/${name}`).then(data => setProject(data.project));
  }, [router, name]);

  return project === null ? (
    <p style={{ color: "white" }}>
      Could not find community with name <code style={{ fontWeight: "bolder" }}>{name}</code>
    </p>
  ) : (
    <>
      <div className={styles["community-page"]}></div>
    </>
  );
};

export default ProjectPage;
