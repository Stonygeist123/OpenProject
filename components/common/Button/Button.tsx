import styles from "./Button.module.scss";

type Size = "s" | "m" | "l" | "xl" | "xxl";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  text?: string;
  dark?: boolean;
};

const sizes = {
  s: styles["small"],
  m: styles["medium"],
  l: styles["large"],
  xl: styles["extra-large"],
  xxl: styles["extra-extra-large"],
};

const getSize = (size: Size) => sizes[size];
const Button = ({ dark = false, size = "m", text = "button", className, ...props }: ButtonProps) => (
  <button className={`${styles["btn"]} ${dark ? styles["dark"] : null} ${getSize(size)} ${className}`} {...props}>
    {props.children ? props.children : text}
  </button>
);

export default Button;
