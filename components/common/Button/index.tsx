import styles from "./Button.module.scss";

type Size = "s" | "m" | "l" | "xl" | "xxl";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  text?: string;
  dark?: boolean;
  className?: string;
  isSubmit?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  image?: File;
  transparent?: boolean;
};

const sizes = {
  s: styles["small"],
  m: styles["medium"],
  l: styles["large"],
  xl: styles["extra-large"],
  xxl: styles["extra-extra-large"],
};

const getSize = (size: Size) => sizes[size];
const Button = ({ dark = false, size = "m", text, className, isSubmit, onClick, image, transparent, ...props }: ButtonProps) =>
  isSubmit ? (
    <Button
      className={`${styles["submit-btn"]} ${className}`}
      onClick={onClick}
      size={size ?? "xl"}
      text={text ?? "Submit"}
      {...props}
    >
      {props.children ?? text ?? "Button"}
    </Button>
  ) : (
    <button
      onClick={onClick}
      className={`${styles["btn"]} ${dark ? styles["dark"] : null} ${getSize(size)} ${transparent ? "bg-transparent" : ""} ${className}`}
      {...props}
    >
      {props.children ?? text ?? "Button"}
    </button>
  );

export default Button;
