import getAllUsers from "@/lib/request";
import { TUser } from "@/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  user: TUser;
  setUser: (user: TUser) => void;
};

export const UserContext = createContext<TContext>({} as TContext);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [user, setUser] = useState<TUser>({} as TUser);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getAllUsers().then((users) => setAllUsers(users));
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    const matchedUser = allUsers.find(
      (user) =>
        user.user === savedUser?.user && user.password === savedUser?.password
    );
    matchedUser && setUser(matchedUser);
    matchedUser && setIsLoggedIn(true);
  }, [user.user, allUsers]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
