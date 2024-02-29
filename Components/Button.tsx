import { ReactNode } from "react";

type Props = {
  text: string | ReactNode;
  onClick?: () => void;
  styles?: string;
  type?: "button" | "reset" | "submit" | undefined;
  disabled?: boolean;
};

export const Button = ({ text, onClick, styles, type, disabled }: Props) => {
  return (
    <button
      className={`text-center bg-light-contrast rounded-3xl relative p-2 py-[13.5px] ${styles}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
