import { setAllUsersFoods } from "@/app/(utils)/requests";
import getAllUsers from "@/lib/request";
import { TFood, TUser } from "@/types";
import { ReactNode, createContext, useEffect, useState } from "react";

type TContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  user: TUser;
  setUser: (user: TUser) => void;
  userFoods: TFood[];
  setUserFoods: (foods: TFood[]) => void;
};

export const UserContext = createContext<TContext>({} as TContext);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [user, setUser] = useState<TUser>({} as TUser);
  const [userFoods, setUserFoods] = useState<TFood[]>([]);

  useEffect(() => {
    getAllUsers().then((users) => setAllUsers(users));
  }, []);

  // validating user login and setting user if already logged in
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    const matchedUser = allUsers.find(
      (user) =>
        user.user === savedUser?.user && user.password === savedUser?.password
    );
    matchedUser && setUser(matchedUser);
    matchedUser && setIsLoggedIn(true);
  }, [user.user, allUsers]);

  // Setting users foods
  useEffect(() => {
    setAllUsersFoods((foods) => setUserFoods(foods), user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        userFoods,
        setUserFoods,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
