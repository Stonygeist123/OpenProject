import Link from "next/link";
import styles from "../index.module.scss";

const Card = ({ title, details, date, url }: { title: string; details: string; date: Date; url: string }) => {
  return (
    <Link
      className={`${styles["card"]}`}
      href={url}
    >
      <p className={`${styles["title"]} text-xxl font-bold`}>{title}</p>
      <p className={`${styles["details"]} text-2x`}>{details}</p>
      <p className={`${styles["date"]} text-sm`}>
        {date.toLocaleDateString()} - {date.toLocaleTimeString()}
      </p>
    </Link>
  );
};

export default Card;
