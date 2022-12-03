import React, { useState } from "react";
import styles from "../styles/pages/index.module.scss";
import CommunityCreationModal from "../components/Modals/CommunityCreationModal";
import ProjectCreationModal from "../components/Modals/ProjectCreationModal";

const ProjectPreview = ({ name, description }: { name: string; description: string }) => (
  <div className={styles["project-preview-container"]}>
    <div className={`${styles["flex-container relative-container"]} ${styles["home-project-heading-container"]}`}>
      <h1 className={styles["project-preview-title"]}>{name}</h1>
      <div className={styles["project-preview-pp"]}></div>
    </div>
    <p className={styles["project-preview-description"]}>{description}</p>
  </div>
);

const SubmissionPreview = () => (
  <div className={styles["submission-preview-container"]}>
    <div className={`${styles["flex-container"]} ${styles["relative-container"]} ${styles["submission-preview-container-heading"]}`}>
      <h1 className={styles["project-preview-title"]}>Submission Name</h1>
      <div className="project-preview-pp"></div>
    </div>
    <p className={styles["project-preview-description"]}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam fugiat distinctio quidem sint provident laborum placeat, adipisci dignissimos
      laudantium! Ipsam atque odio incidunt dolorem officiis minus. Ducimus asperiores delectus obcaecati!
    </p>
  </div>
);

const CommunityPreview = () => {
  return (
    <div className={styles["community-preview"]}>
      <div className={`${styles["flex-container"]} ${styles["relative-container"]}`}>
        <h1 className={styles["community-preview-title"]}> Community Name </h1>
        <div className={styles["community-preview-pp"]}></div>
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam optio ad dolor iusto fuga velit blanditiis fugiat sint nulla nostrum tempora
        voluptatum explicabo non, voluptatibus pariatur nam, quas nemo voluptate.
      </p>
      <p>Member count: </p>
    </div>
  );
};

const RenderMain = (props: any) =>
  props.highlight === "projects" ? (
    <>
      <ProjectPreview description="a" name="ba" />
      <ProjectPreview description="a" name="b" />
      <ProjectPreview description="x" name="dy" />
    </>
  ) : (
    <>
      <SubmissionPreview />
      <SubmissionPreview />
      <SubmissionPreview />
    </>
  );

const Home = () => {
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [highlight, setHighlight] = useState("projects");
  const [showProjectModal, setShowProjectModal] = useState(false);

  return (
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
          <RenderMain highlight={highlight} />
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
