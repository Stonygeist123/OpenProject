import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson from "../../../lib/fetchJson";
import styles from "../../../styles/pages/user/profile/index.module.scss";
import Loading from "../../../components/Loading";
import ProfileCard from "../../../components/ProfileCard";
import RecentsContainer from "../../../components/Profile/RecentsContainer";
import AboutSection from "../../../components/Profile/AboutSection";
import ProjectsContainer from "../../../components/Profile/ProjectsContainer";
import CommunitiesContainer from "../../../components/Profile/CommunitiesContainer";

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
    description: string;
  };
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { username } = router.query;
  const [user, setUser] = useState<{
    projects: Project[];
    communities: Community[];
    task_submissions: TaskSubmission[];
    image: string;
    name: string;
    created_at: Date;
    description: string;
  } | null>();

  const [recents, setRecents] = useState<
    | {
        name: string;
        description: string;
        url: string;
        date: string;
      }[]
  >([]);

  useEffect(() => {
    if (router.isReady) {
      if (u) {
        setUser(u);
        setLoading(false);
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
            description: string;
          } | null;
        }>(`/api/user?username=${username}`).then(data => {
          setUser(data.user);
          console.log(data.user);
          setLoading(false);
        });
      }
    }
  }, [router.isReady, u, username]);

  if (user)
    return (
      <>
        <div className={styles["header"]}>
          <ProfileCard
            width="100%"
            user={user}
            background="transparent"
            size="4x"
          />
        </div>
        <div className="body mx-8 my-20">
          <AboutSection description={user.description} />
          <RecentsContainer recents={recents} />
          <ProjectsContainer projects={user.projects} />
          <CommunitiesContainer communities={user.communities} />
        </div>
      </>
    );
  else if (loading) return <Loading />;
  else return <p style={{ color: "white" }}>Could not find &ldquo;{username}&rdquo;</p>;
};

export default UserProfilePage;
