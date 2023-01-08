import styles from "./index.module.scss";

const AboutSection = ({ description }: { description: string }) => {
  return (
    <>
      <h3
        className="text-xxl font-bold"
        style={{ marginBottom: "1em" }}
      >
        About
      </h3>
      <div className={`${styles["wrapper"]}`}>
        <p className={`text-lg ${styles["description"]}`}>{description}</p>
      </div>
    </>
  );
};

export default AboutSection;
