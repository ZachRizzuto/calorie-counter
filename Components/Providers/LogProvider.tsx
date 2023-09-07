import { TUser } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";

type TContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  user: TUser;
  setUser: (user: TUser) => void;
};

export const LogContext = createContext<TContext>({} as TContext);
export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser>({} as TUser);
  return (
    <LogContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};
