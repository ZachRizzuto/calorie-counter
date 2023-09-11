import { ReactNode } from "react";

type Props = {
  width: string;
  height: string;
};

export const PageSection = ({
  styles,
  children,
}: {
  styles: Props;
  children: ReactNode;
}) => {
  return (
    <div
      className={`bg-gray-800 rounded-md flex flex-col items-start justify-start p-[20px] border-b-2 border-green-500 ${styles.height} ${styles.width}`}
    >
      {children}
    </div>
  );
};
