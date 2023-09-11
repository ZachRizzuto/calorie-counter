import styles from "./Button.module.css";

type Props = {
  text: string;
  onClick: () => void;
  styles?: string;
};

export const Button = ({ text, onClick, styles }: Props) => {
  return (
    <button
      className={`text-center text-white bg-gray-700 rounded-full relative p-2 ${styles}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
