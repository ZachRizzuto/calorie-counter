import {
  deleteEntry,
  getAllDays,
  getAllEntries,
  getAllFoods,
  newDay,
} from "@/app/(utils)/requests";
import { getUsers } from "../../app/(utils)/requests";
import { TDay, TEntry, TFood, TUser } from "@/types";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
const dateToday = `${month + 1}/${day}/${year}`;

type TContext = {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  user: TUser;
  setUser: (user: TUser) => void;
  userFoods: TFood[];
  setUserFoods: (foods: TFood[]) => void;
  deleteFood: (entry: TEntry) => void;
  userEntries: TEntry[];
  setUserEntries: (entries: TEntry[]) => void;
  todaysEntries: TEntry[];
  setTodaysEntries: (entries: TEntry[]) => void;
  userDays: TDay[];
  setUserDays: (days: TDay[]) => void;
  today: TDay;
  setToday: (day: TDay) => void;
  todaysFood: TFood[];
  setTodaysFood: (foods: TFood[]) => void;
  allUsers: TUser[];
  handleAllData: () => void;
  totalCalories: number;
  setTotalCalories: (calories: number) => void;
  resetState: () => void;
};

export const UserContext = createContext<TContext>({} as TContext);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [user, setUser] = useState<TUser>({} as TUser);
  const [userFoods, setUserFoods] = useState<TFood[]>([]);
  const [todaysFood, setTodaysFood] = useState<TFood[]>([]);
  const [userEntries, setUserEntries] = useState<TEntry[]>([]);
  const [todaysEntries, setTodaysEntries] = useState<TEntry[]>([]);
  const [userDays, setUserDays] = useState<TDay[]>([]);
  const [today, setToday] = useState<TDay>({} as TDay);
  const [totalCalories, setTotalCalories] = useState(0);

  const { push } = useRouter();

  const resetState = () => {
    setIsLoggedIn(false);
    setAllUsers([]);
    setUser({} as TUser);
    setUserFoods([]);
    setTodaysFood([]);
    setUserEntries([]);
    setTodaysEntries([]);
    setUserDays([]);
    setToday({} as TDay);
    setTotalCalories(0);
  };

  const deleteFood = (entry: TEntry) => {
    deleteEntry(entry.id).then((res) => {
      if (res.ok) {
        setTodaysEntries(todaysEntries.filter((ent) => ent.id !== entry.id));
      } else {
        throw new Error("Couldn't Delete Food :(");
      }
    });
  };

  const handleDate = async (user: TUser, entries: TEntry[], foods: TFood[]) => {
    // Setting the users days
    await getAllDays()
      .then((days) => {
        const userDays = days.filter((day: TDay) => {
          return day.userId === user.id;
        });
        return userDays;
      })
      .then((userDays) => {
        setUserDays(userDays);
        // Setting Today && if a new day creating another day
        getToday(userDays, user.id, entries, foods);
      });
  };

  const getToday = (
    days: TDay[],
    userId: number,
    userEntries: TEntry[],
    foods: TFood[]
  ) => {
    const matchedDay = days.find((day) => day.date === dateToday);

    if (matchedDay) {
      const filteredTodaysEntries = userEntries.filter(
        (entry) => entry.dayId === matchedDay.id
      );

      let variable: TFood[] = [];

      for (let i = 0; i < filteredTodaysEntries.length; i++) {
        for (let j = 0; j < foods.length; j++) {
          if (filteredTodaysEntries[i].foodId === foods[j].id) {
            variable.push(foods[j]);
          }
        }
      }

      setTodaysFood(variable);

      setTotalCalories(
        variable.reduce((prev, curr) => (prev += curr.calories), 0)
      );

      setTodaysEntries(filteredTodaysEntries);

      setToday(matchedDay);
    } else {
      if (userId || userId === 0) {
        newDay(userId, dateToday)
          .then((res) => res.json())
          .then((day) => {
            setToday(day);
            setUserDays([...userDays, day]);
          });
      }
    }
  };

  const setAllUsersFoods = (user: TUser) => {
    getAllEntries().then((entries) => {
      const matchedEntries = entries.filter(
        (entry: TEntry) => entry.userId === user.id
      );

      setUserEntries(matchedEntries);

      getAllFoods()
        .then((foods) => {
          setUserFoods(foods);
          return foods;
        })
        .then((foods) => handleDate(user, matchedEntries, foods));
    });
  };

  const handleLogin = async () => {
    // validating user login and setting user if already logged in
    return await getUsers()
      .then((users) => {
        setAllUsers(users);
        return users;
      })
      .then((users) => {
        const localStoreUser = localStorage.getItem("user");

        if (localStoreUser) {
          const savedUser = JSON.parse(localStoreUser);
          const matchedUser = users.find(
            (user) =>
              user.user === savedUser.user &&
              user.password === savedUser.password
          );
          if (matchedUser) {
            setIsLoggedIn(true);
            setUser(matchedUser);
            return matchedUser;
          }
        } else {
          push("/login");
        }
      });
  };

  const handleAllData = async () => {
    await handleLogin().then((user) => {
      if (user) {
        setAllUsersFoods(user);
      }
    });
  };

  useEffect(() => {
    handleAllData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        userFoods,
        setUserFoods,
        deleteFood,
        userEntries,
        setUserEntries,
        todaysEntries,
        setTodaysEntries,
        userDays,
        setUserDays,
        today,
        setToday,
        todaysFood,
        setTodaysFood,
        totalCalories,
        setTotalCalories,
        allUsers,
        handleAllData,
        resetState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
