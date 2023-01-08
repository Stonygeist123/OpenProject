import Image from "next/image";
import styles from "./index.module.scss";
import black from "../../public/black.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import fetchJson from "../../lib/fetchJson";

type Sizes = "md" | "2x" | "4x";

const ProfileCard = ({
  user,
  width = "20em",
  height = "auto",
  background = "rgb(40, 40, 40)",
  shadow = false,
  size = "md",
}: {
  user:
    | {
        communities: Community[];
        projects: Project[];
        task_submissions: TaskSubmission[];
        image: string;
        name: string;
        created_at: Date;
      }
    | User;
  width?: string;
  height?: string;
  background?: string;
  shadow?: boolean;
  size?: Sizes;
}) => {
  const [userData, setUserData] = useState<{
    communities: Community[];
    projects: Project[];
    task_submissions: TaskSubmission[];
    image: string;
    name: string;
    created_at: Date;
  }>();

  useEffect(() => {
    if (!userData) {
      fetchJson<{
        user: {
          communities: Community[];
          projects: Project[];
          task_submissions: TaskSubmission[];
          image: string;
          name: string;
          created_at: Date;
        };
      }>(`/api/user?username=${user.name}`).then(data => {
        setUserData(data.user);
      });
    }
  }, [user.name, userData]);

  return (
    <div
      className={`${styles["card-container"]} ${shadow ? styles["shadow"] : null}`}
      style={{
        width,
        height,
        background,
      }}
    >
      <Link
        href={`/user/profile/${user.name}`}
        className={styles["profile-icon-wrapper"]}
      >
        <Image
          src={user.image || black}
          alt={"profile-icon"}
          width={100}
          height={100}
          className={styles["profile-icon"]}
        />
        <p className={`${styles["name"]} text-${size == "md" ? "lg" : size == "2x" ? "3x" : "title"} font-bold`}>{user.name}</p>
      </Link>
      <p className={`${styles["date"]} text-${size == "md" ? "sm" : size == "2x" ? "md" : "md"}`}>
        Created: {new Date(user.created_at).toLocaleDateString()}
      </p>
      <div className={styles["social-container"]}>
        <div>
          <p className={`text-${size} font-bold`}>{userData?.projects.length ?? 0}</p>
          <p className={`text-${size == "md" ? "sm" : size == "2x" ? "md" : "lg"}`}>Projects</p>
        </div>
        <div>
          <p className={`text-${size} font-bold`}>{userData?.communities.length ?? 0}</p>
          <p className={`text-${size == "md" ? "sm" : size == "2x" ? "md" : "lg"}`}>Communities</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
