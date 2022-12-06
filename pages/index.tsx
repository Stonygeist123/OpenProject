import React, { useEffect, useState } from "react";
import styles from "../styles/pages/index.module.scss";
import CommunityCreationModal from "../components/Modals/CommunityCreationModal";
import ProjectCreationModal from "../components/Modals/ProjectCreationModal";
import fetchJson from "../lib/fetchJson";
import { NextRouter, useRouter } from "next/router";

const ProjectPreview = ({ project, router }: { project: Project; router: NextRouter }) => (
  <div
    onClick={() => router.push(`/project/${project.id}`)}
    className={styles["project-preview-container"]}
  >
    <div className={`${styles["flex-container relative-container"]} ${styles["home-project-heading-container"]}`}>
      <h1 className={`text-5x ${styles["project-preview-title"]}`}>{project.name}</h1>
    </div>
    <p className={`text-md ${styles["project-preview-description"]}`}>{project.description}</p>
  </div>
);

const SubmissionPreview = () => (
  <div className={styles["project-preview-container"]}>
    <div className={`${styles["flex-container"]} ${styles["relative-container"]} ${styles["project-preview-container-heading"]}`}>
      <h1 className={styles["project-preview-title"]}>Submission Name</h1>
      <div className="project-preview-pp"></div>
    </div>
    <p className={styles["project-preview-description"]}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam fugiat distinctio quidem sint provident laborum placeat, adipisci dignissimos
      laudantium! Ipsam atque odio incidunt dolorem officiis minus. Ducimus asperiores delectus obcaecati!
    </p>
  </div>
);

const CommunityPreview = () => (
  <div className={styles["project-preview-container"]}>
    <div className={`${styles["flex-container"]} ${styles["relative-container"]}`}>
      <h1 className={styles["project-preview-title"]}> Community Name </h1>
      <div className={styles["community-preview-pp"]}></div>
    </div>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam optio ad dolor iusto fuga velit blanditiis fugiat sint nulla nostrum tempora
      voluptatum explicabo non, voluptatibus pariatur nam, quas nemo voluptate.
    </p>
    <p className="text-md font-bold">Member count: {0}</p>
  </div>
);

const RenderMain = ({ highlight, projects, router }: { highlight: string; projects: Project[]; router: NextRouter }) =>
  highlight === "projects" ? (
    <>
      {projects.map((p, i) => (
        <ProjectPreview
          project={p}
          router={router}
          key={i}
        />
      ))}
    </>
  ) : (
    <>
      <SubmissionPreview />
      <SubmissionPreview />
      <SubmissionPreview />
    </>
  );

const Home = () => {
  const router = useRouter();
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [highlight, setHighlight] = useState("projects");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [user, setUser] = useState<{
    projects: Project[];
    communities: Community[];
    task_submissions: TaskSubmission[];
    image: string;
    name: string;
    created_at: Date;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!router.isReady) return;

    fetchJson<{
      message: string;
      allowed: boolean;
      found: boolean;
      user: {
        projects: Project[];
        communities: Community[];
        task_submissions: TaskSubmission[];
        image: string;
        name: string;
        created_at: Date;
      } | null;
    }>("/api/user").then(data => {
      setUser(data.user);
      setLoading(false);
    });
  }, [router.isReady]);

  useEffect(() => {
    console.log(user?.projects);
  }, [user]);

  return loading ? (
    <h1 className="text-xxl">Loading...</h1>
  ) : (
    <>
      {showProjectModal ? (
        <ProjectCreationModal
          closeFunction={() => {
            setShowProjectModal(v => !v);
          }}
        />
      ) : null}
      {showCommunityModal ? (
        <CommunityCreationModal
          closeFunction={() => {
            setShowCommunityModal(v => !v);
          }}
        />
      ) : null}

      <div className={`${styles["home-section"]} ${styles["dark"]}`}>
        <div className={styles["home-left-nav"]}>
          <button
            className={styles["home-button"]}
            onClick={() => {
              setShowCommunityModal(true);
            }}
          >
            <h1>Create a new community</h1>
            <p>Find collaborators and work on something new</p>
          </button>
          <div>
            <button
              className={styles["home-button"]}
              onClick={() => {
                setShowProjectModal(true);
              }}
            >
              <h1>Create a new project</h1>
              <p>Write down tasks and project requirements</p>
            </button>
          </div>
        </div>

        <div className={styles["project-previews"]}>
          <div className={styles["home-nav"]}>
            <div className={`${styles["home-heading"]} ${highlight === "projects" ? styles["highlight"] : null}`}>
              <strong
                onClick={() => {
                  setHighlight("projects");
                }}
              >
                Projects
              </strong>
            </div>
            <div className={`${styles["home-heading"]} ${highlight === "submissions" ? styles["highlight"] : null} `}>
              <strong
                onClick={() => {
                  setHighlight("submissions");
                }}
              >
                Submissions
              </strong>
            </div>
          </div>
          <RenderMain
            projects={user?.projects.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()) ?? []}
            highlight={highlight}
            router={router}
          />
        </div>

        <div className={styles["home-right-nav"]}>
          <h1>Explore Communities</h1>
          <CommunityPreview />
          <CommunityPreview />
          <CommunityPreview />
        </div>
      </div>
    </>
  );
};

export default Home;
