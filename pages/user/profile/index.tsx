import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import fetchJson from "../../../lib/fetchJson";
import UserProfilePage from "./[username]";

const ProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{
    projects: Project[];
    communities: Community[];
    task_submissions: TaskSubmission[];
    image: string;
    name: string;
    created_at: Date;
    description: string;
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
            description: string;
          } | null;
        }>(`/api/user?username=${data.user.username}`, { method: "POST" }).then(data => {
          setUser(data.user);
          setLoading(false);
        });
      else setLoading(false);
    });
  }, [loading, router.isReady]);

  if (loading) return <Loading />;
  else if (user) return <UserProfilePage user={user} />;
  else return <h1 style={{ color: "white", textAlign: "center", fontSize: "xx-large" }}>You need to be logged in to view your profile.</h1>;
};

export default ProfilePage;
