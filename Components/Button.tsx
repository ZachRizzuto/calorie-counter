import styles from "./Button.module.css";
export const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`text-center text-white bg-gray-700 rounded-full relative p-2 hover:bg-red-700`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
