import { ReactNode } from "react";

type Props = {
  width: string;
  height: string;
  custom?: string;
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
      className={`bg-light-dark-contrast rounded-md flex items-start justify-start p-[20px] border-b-2 border-green-500 ${styles.height} ${styles.width} ${styles.custom}`}
    >
      {children}
    </div>
  );
};
