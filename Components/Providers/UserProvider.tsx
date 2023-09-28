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
  deleteFood: (entry: TEntry, foodId: number) => void;
  userEntries: TEntry[];
  setUserEntries: (entries: TEntry[]) => void;
  userDays: TDay[];
  setUserDays: (days: TDay[]) => void;
  today: TDay;
  setToday: (day: TDay) => void;
  todaysFood: TFood[];
  setTodaysFood: (foods: TFood[]) => void;
};

export const UserContext = createContext<TContext>({} as TContext);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [user, setUser] = useState<TUser>({} as TUser);
  const [userFoods, setUserFoods] = useState<TFood[]>([]);
  const [todaysFood, setTodaysFood] = useState<TFood[]>([]);
  const [userEntries, setUserEntries] = useState<TEntry[]>([]);
  const [userDays, setUserDays] = useState<TDay[]>([]);
  const [today, setToday] = useState<TDay>({} as TDay);

  const { push } = useRouter();

  const deleteFood = (entry: TEntry, foodId: number) => {
    setUserFoods(userFoods.filter((food) => food.id !== foodId));
    setTodaysFood(todaysFood.filter((food) => food.id !== entry.foodId));
    deleteEntry(entry.id).catch(() => setUserFoods(userFoods));
  };

  const handleDate = async (
    user: TUser,
    userFoods: TFood[],
    entries: TEntry[]
  ) => {
    // Setting the users days
    console.log("Handling Date");
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
        getToday(userDays, user.id, userFoods, entries);
      });
  };

  const getToday = (
    days: TDay[],
    userId: number,
    userFoods: TFood[],
    userEntries: TEntry[]
  ) => {
    const matchedDay = days.find((day) => day.date === dateToday);

    if (matchedDay) {
      console.log("user entries:", userEntries);
      console.log("matched day id:", matchedDay.id);
      const todaysEntries = userEntries.filter(
        (entry) => entry.dayId === matchedDay.id
      );

      console.log("todays entries:", todaysEntries);

      let todaysFoods: TFood[] = [];
      for (let i = 0; i < todaysEntries.length; i++) {
        for (let j = 0; j < userFoods.length; j++) {
          if (todaysEntries[i].foodId === userFoods[j].id) {
            todaysFoods = [...todaysFoods, userFoods[j]];
          }
        }
      }

      setTodaysFood(todaysFoods);

      // setTodaysFood();

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
          return foods.filter((food: TFood) =>
            matchedEntries.find((entry: TEntry) => entry.foodId === food.id)
          );
        })
        .then((userFoods) => {
          setUserFoods(userFoods);
          return userFoods;
        })
        .then((userFoods) => handleDate(user, userFoods, matchedEntries));
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
          console.log(matchedUser);
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
        userDays,
        setUserDays,
        today,
        setToday,
        todaysFood,
        setTodaysFood,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
