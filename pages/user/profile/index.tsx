import { useEffect, useState } from "react";
import fetchJson from "../../../lib/fetchJson";
import UserProfilePage from "./[username]";

const ProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{
    projects: Project[];
    communities: Community[];
    task_submissions: TaskSubmission[];
    image: string;
    name: string;
    created_at: Date;
  } | null>(null);

  useEffect(() => {
    fetchJson<{ user: UserSession | null }>("/api/user/account/get_session").then(data => {
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
          setLoading(false);
        });
      else setLoading(false);
    });
  }, [loading]);

  if (loading) return <h1 style={{ color: "white", textAlign: "center", fontSize: "xx-large" }}>Loading...</h1>;
  else if (user) return <UserProfilePage user={user} />;
  else return <h1 style={{ color: "white", textAlign: "center", fontSize: "xx-large" }}>You need to be logged in to view your profile.</h1>;
};

export default ProfilePage;
