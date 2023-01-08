import styles from "./index.module.scss";

import Card from "./Card";

const HorizontalContainer = ({ data, heading }: { data: { name: string; description: string; url: string; date: string }[]; heading: string }) => {
  return (
    <>
      <>
        <h1 className={`${styles["heading"]} text-xxl font-bold`}>{heading}</h1>
        <div className={`${styles["wrapper"]}`}>
          <div className={`${styles["container"]} flex scrollbar-x`}>
            {data.length !== 0 ? (
              data.map((d, i) => (
                <Card
                  key={i}
                  title={d.name}
                  url={d.url}
                  details={d.description}
                  date={new Date(d.date)}
                />
              ))
            ) : (
              <h1 className={`${styles["none-heading"]}`}>None</h1>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default HorizontalContainer;
