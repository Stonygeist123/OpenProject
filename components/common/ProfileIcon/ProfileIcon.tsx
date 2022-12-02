import { PropsWithChildren } from "react";
import styles from "./ProfileIcon.module.scss";

type Size = "xs" | "s" | "m" | "l";

type ProfileIconProps = PropsWithChildren & {
  size?: Size;
};

const sizes = {
  xs: "icon-xs",
  s: "icon-s",
  m: "icon-m",
  l: "icon-l",
};
const getSize = (size: Size) => sizes[size];

const ProfileIcon = ({ children, size = "m" }: ProfileIconProps) => {
  return <div className={`${styles["icon"]} ${styles[getSize(size)]}`}>{children}</div>;
};

export default ProfileIcon;
