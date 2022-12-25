import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import fetchJson from "../../../lib/fetchJson";
import styles from "../../../styles/pages/user/profile/index.module.scss";

const UserProfilePage = ({
  user: u,
}: {
  user?: {
    projects: Project[];
    communities: Community[];
    task_submissions: TaskSubmission[];
    image: string;
    name: string;
    created_at: Date;
  };
}) => {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState<{
    projects: Project[];
    communities: Community[];
    task_submissions: TaskSubmission[];
    image: string;
    name: string;
    created_at: Date;
  } | null>();

  useEffect(() => {
    if (router.isReady) {
      if (u) {
        setUser(u);
      } else {
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
        });
      }
    }
  }, [router.isReady, u, username]);

  if (user)
    return (
      <div className={styles["profile"]}>
        <div className={styles["top"]}>
          {user.image !== "" ? (
            <Image
              src={user.image}
              alt={"profile-icon"}
            />
          ) : null}
          <p className={`text-head font-bold ${styles["username"]}`}>{user.name}</p>
        </div>
      </div>
    );
  else return <p style={{ color: "white" }}>Could not find &ldquo;{username}&rdquo; not found</p>;
};

export default UserProfilePage;
