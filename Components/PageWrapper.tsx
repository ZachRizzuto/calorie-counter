import { ReactNode } from "react";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex flex-col h-[100vh]">{children}</div>
    </>
  );
};
