import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "../../../lib/fetchJson";

const ProjectPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userLoaded, setUserLoaded] = useState(false);
  const [_, setUser] =
    useState<{
      projects: Project[];
      communities: Community[];
      task_submissions: TaskSubmission[];
      image: string;
      name: string;
      created_at: Date;
    } | null>();

  useEffect(() => {
    if (!router.isReady) return;

    fetchJson<{
      message: string;
      found: boolean;
      admin: boolean;
      user: {
        projects: Project[];
        communities: Community[];
        task_submissions: TaskSubmission[];
        image: string;
        name: string;
        created_at: Date;
      } | null;
    }>(`/api/user?username=${username}`).then(data => {
      setUser(data.user);
      setUserLoaded(true);
    });
  }, [router.isReady, username]);

  if (userLoaded) return <p style={{ color: "white" }}>This page is for a user with the username: {username}</p>;
  else return <p style={{ color: "white" }}>User with username {username} not found</p>;
};

export default ProjectPage;
