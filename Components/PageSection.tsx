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
      className={`bg-gray-800 rounded-md flex flex-col items-start justify-center p-[20px] mx-[20px] mt-[50px] ${styles.height} ${styles.width}`}
    >
      {children}
    </div>
  );
};
