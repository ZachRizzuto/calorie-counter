import styles from "./Button.module.css";

type Props = {
  text: string;
  onClick?: () => void;
  styles?: string;
  type?: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
};

export const Button = ({ text, onClick, styles, type, disabled }: Props) => {
  return (
    <button
      className={`text-center text-white bg-gray-700 rounded-full relative p-2 ${styles}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
