import {
  getAllFoods,
  getAllUsersDays,
  getDate,
  getEntriesForUserByDay,
  getJwtTokenFromLocalStorage,
  loginFromJwt,
  newDay,
} from "@/app/(utils)/requests";
import { TDay, TEntry, TFood, TUser } from "@/types";
import { localStorageUserSchema, userSchema } from "@/zod-types";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();
const dateToday = `${month + 1}-${day}-${year}`;

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
  handleUserFoodData: () => void;
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
    // deleteEntry(entry.id).then((res) => {
    //   if (res.ok) {
    //     setTodaysEntries(todaysEntries.filter((ent) => ent.id !== entry.id));
    //   } else {
    //     throw new Error("Couldn't Delete Food :(");
    //   }
    // });
  };

  const handleDate = (food: TFood[]) => {
    // Setting the users days
    getAllUsersDays(getJwtTokenFromLocalStorage()).then((userDays) => {
      setUserDays(userDays);
      // Setting Today && if a new day creating another day
      getTodaysInformation(food);
    });
  };

  const getTodaysInformation = async (foods: TFood[]) => {
    let matchedDay: undefined | TDay;

    matchedDay = await getDate(dateToday, getJwtTokenFromLocalStorage()).then(
      (day) => {
        if (!day) {
          return newDay(dateToday, getJwtTokenFromLocalStorage())
            .then((res) => res.json())
            .then((day) => {
              setToday(day);
              setUserDays([...userDays, day]);
            });
        }
        return day;
      }
    );

    if (matchedDay !== undefined) {
      const filteredTodaysEntries = await getEntriesForUserByDay(
        matchedDay.id,
        getJwtTokenFromLocalStorage()
      ).then((entries) => {
        setTodaysEntries(entries);
        return entries;
      });

      const allFoodCaloriesForToday: number[] = filteredTodaysEntries.map(
        (entry: TEntry) => {
          const food = foods.find((food) => food.id === entry.foodId);
          if (food) {
            return food.calories;
          }
          return 0;
        }
      );

      console.log(allFoodCaloriesForToday);

      setTotalCalories(
        allFoodCaloriesForToday.reduce((prev, curr) => (prev += curr), 0)
      );

      setToday(matchedDay);
    }
  };

  const handleUserFoodData = () => {
    getAllFoods()
      .then((foods) => {
        setAllFoods(foods);
        return foods;
      })
      .then((foods) => handleDate(foods));
  };

  const handleLogin = async () => {
    // setting user if already logged in

    const localStoreUser = localStorage.getItem("user");

    if (localStoreUser) {
      const userJson = JSON.parse(localStoreUser);

      const isCorrectUserFormat = localStorageUserSchema.parse(userJson);

      if (!isCorrectUserFormat) {
        return new Error("Incorrect user format");
      }

      return loginFromJwt(userJson.token)
        .then((user) => {
          if (userSchema.parse(user)) {
            setIsLoggedIn(true);
            setUser(user);
            return user;
          } else {
            throw new Error("Incorrect user data type");
          }
        })
        .catch((e) => console.log({ ERROR: e }));
    } else {
      push("/login");
    }
  };

  const handleUserLoginData = async () => {
    await handleLogin().then((user) => {
      if (user) {
        handleUserFoodData();
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
        resetState,
        handleUserFoodData,
      }}
    >
      {children}
    </UserContentContext.Provider>
  );
};
