import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProjectPage = () => {
  const router = useRouter();
  const [userFound, setUserFound] = useState(false);
  //   const [userData, setUserData] = useState();
  const { username } = router.query;

  const verifyId = async (id: string | string[] | undefined) => {
    // verify id here
    if (id === "traveller") {
      return { success: true, project: {} };
    } else {
      return { success: false, project: {} };
    }
  };

  const getProject = async () => {
    console.log("getting project");
    const result = await verifyId(username);
    console.log("project found");
    if (result.success) {
      setUserFound(true);
      //   you can also define and set the project data here
    } else {
      console.log("project not found");
      setUserFound(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    console.log(username);
    getProject();
  }, [router.isReady, userFound]);

  if (userFound) {
    return (
      <>
        <p style={{ color: "white" }}>This page is for a user with the username: {username}</p>
      </>
    );
  } else {
    return (
      <>
        <p style={{ color: "white" }}>User with username {username} not found</p>
      </>
    );
  }
};

export default ProjectPage;
