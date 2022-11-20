import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projectFound, setProjectFound] = useState(false);
  //   const [projectData, setProjectData] = useState();

  const verifyId = async (id: string | string[] | undefined) => {
    // verify id here
    if (id === "1") {
      return { success: true, project: {} };
    } else {
      return { success: false, project: {} };
    }
  };

  const getProject = async () => {
    console.log("getting project");
    const result = await verifyId(id);
    console.log("project found");
    if (result.success) {
      setProjectFound(true);
      //   you can also define and set the project data here
    } else {
      console.log("project not found");
      setProjectFound(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    console.log(id);
    getProject();
  }, [router.isReady, projectFound]);

  if (projectFound) {
    return (
      <>
        <p style={{ color: "white" }}>This page is for a project with the id: {id}</p>
      </>
    );
  } else {
    return (
      <>
        <p style={{ color: "white" }}>Project with id {id} not found</p>
      </>
    );
  }
};

export default ProjectPage;
