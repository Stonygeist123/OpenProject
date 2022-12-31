import { useEffect, useState } from "react";
import fetchJson from "../../../lib/fetchJson";

const ProjectPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userSession, setUserSession] = useState<UserSession | null>();
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
    fetchJson<{ user: UserSession | null }>("/api/user/account/get_session").then(data => {
      setUserSession(data.user);

      if (data.user)
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
        }>(`/api/user/token`, { method: "POST", body: JSON.stringify({ token: data.user.token }) }).then(data => {
          setUser(data.user);
        });

      setLoading(false);
    });
  }, [loading]);

  if (loading) return <h1 style={{ color: "white", textAlign: "center", fontSize: "xx-large" }}>Loading...</h1>;
  else if (userSession) return <p style={{ color: "white" }}>This page is for a user with the username: &ldquo;{userSession.username}&rdquo;.</p>;
  else return <h1 style={{ color: "white" }}>You need to be logged in to view your profile.</h1>;
};

export default ProjectPage;
