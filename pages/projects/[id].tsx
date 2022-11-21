import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "../../lib/fetchJson";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projectFound, setProjectFound] = useState(false);
  const [projectData, setProjectData] = useState<Project | null>(null);

  const verifyId = async (
    id: string | string[] | undefined
  ): Promise<{
    success: boolean;
    project: Project | null;
  }> => {
    const data = await fetchJson<{
      message: string;
      found: boolean;
      admin: boolean;
      project: Project | null;
    }>(`/api/project/${id}`);
    setProjectData(data.project);
    return data.found ? { success: true, project: data.project } : { success: false, project: null };
  };

  const getProject = async () => {
    console.log("getting project");
    const result = await verifyId(id);
    console.log("project found");
    setProjectFound(result.success);
  };

  useEffect(() => {
    if (!router.isReady) return;
    console.log(id);
    getProject();
  }, [router.isReady, projectFound]);

  useEffect(() => {
    console.log(`Project data:\n\t`, projectData);
  }, [projectData]);

  return <p style={{ color: "white" }}>{projectFound ? `This page is for a project with the id: ${id}` : `Project with id ${id} not found`}</p>;
};

export default ProjectPage;
