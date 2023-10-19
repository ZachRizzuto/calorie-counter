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
  allFoods: TFood[];
  setAllFoods: (foods: TFood[]) => void;
  deleteFood: (entry: TEntry) => void;
  userEntries: TEntry[];
  setUserEntries: (entries: TEntry[]) => void;
  todaysEntries: TEntry[];
  setTodaysEntries: (entries: TEntry[]) => void;
  userDays: TDay[];
  setUserDays: (days: TDay[]) => void;
  today: TDay;
  setToday: (day: TDay) => void;
  handleUserLoginData: () => void;
  totalCalories: number;
  setTotalCalories: (calories: number) => void;
  resetState: () => void;
};

export const UserContentContext = createContext<TContext>({} as TContext);
export const UserContentProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<TUser>({} as TUser);
  const [allFoods, setAllFoods] = useState<TFood[]>([]);
  const [userEntries, setUserEntries] = useState<TEntry[]>([]);
  const [todaysEntries, setTodaysEntries] = useState<TEntry[]>([]);
  const [userDays, setUserDays] = useState<TDay[]>([]);
  const [today, setToday] = useState<TDay>({} as TDay);
  const [totalCalories, setTotalCalories] = useState(0);

  const { push } = useRouter();

  const resetState = () => {
    setIsLoggedIn(false);
    setUser({} as TUser);
    setAllFoods([]);
    setUserEntries([]);
    setTodaysEntries([]);
    setUserDays([]);
    setToday({} as TDay);
    setTotalCalories(0);
  };

  // Deletes Entry On Today Page
  const deleteFood = (entry: TEntry) => {
    deleteEntry(entry.id).then((res) => {
      if (res.ok) {
        setTodaysEntries(todaysEntries.filter((ent) => ent.id !== entry.id));
      } else {
        throw new Error("Couldn't Delete Food :(");
      }
    });
  };

  const handleDate = async (user: TUser, foods: TFood[]) => {
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
        getEntriesForUser(userDays).then((entries) => {
          // Setting Today && if a new day creating another day
          getTodaysInformation(userDays, user.id, entries, foods);
        });
      });
  };

  const getTodaysInformation = (
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

      const entryFoodIds = filteredTodaysEntries.map((entry) => entry.foodId);

      const filteredFood = foods.filter((food) =>
        entryFoodIds.includes(food.id)
      );

      setTotalCalories(
        filteredFood.reduce((prev, curr) => (prev += curr.calories), 0)
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

  const getEntriesForUser = (days: TDay[]) => {
    return getAllEntries().then((entries) => {
      const dayUserIds = days.map((day) => day.id);

      const matchedEntries = entries.filter((entry: TEntry) =>
        dayUserIds.includes(entry.dayId)
      );

      setUserEntries(matchedEntries);

      return matchedEntries;
    });
  };

  const handleUserFoodData = (user: TUser) => {
    getAllFoods()
      .then((foods) => {
        setAllFoods(foods);
        return foods;
      })
      .then((foods) => handleDate(user, foods));
  };

  const handleLogin = async () => {
    // validating user login and setting user if already logged in
    return await getUsers().then((users) => {
      const localStoreUser = localStorage.getItem("user");

      if (localStoreUser) {
        const savedUser = JSON.parse(localStoreUser);
        const matchedUser = users.find(
          (user) =>
            user.user === savedUser.user && user.password === savedUser.password
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

  const handleUserLoginData = async () => {
    await handleLogin().then((user) => {
      if (user) {
        handleUserFoodData(user);
      }
    });
  };

  useEffect(() => {
    handleUserLoginData();
  }, []);

  return (
    <UserContentContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        allFoods,
        setAllFoods,
        deleteFood,
        userEntries,
        setUserEntries,
        todaysEntries,
        setTodaysEntries,
        userDays,
        setUserDays,
        today,
        setToday,
        totalCalories,
        setTotalCalories,
        handleUserLoginData,
        resetState,
      }}
    >
      {children}
    </UserContentContext.Provider>
  );
};
