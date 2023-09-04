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
      className={`h-8 w-40 text-center text-white bg-gray-700 rounded-md relative ${styles.btnShadowAni}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
