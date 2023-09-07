import { ReactNode } from "react";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col h-full">{children}</div>
    </>
  );
};
