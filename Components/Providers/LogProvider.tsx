import { ReactNode, createContext, useContext, useState } from "react";
type TContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
};
export const LogContext = createContext<TContext>({} as TContext);
export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LogContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};
