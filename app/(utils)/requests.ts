import { TEntry, TFood, TUser } from "@/types";

export const getUsers = () => {
  return fetch("http://192.168.1.156:3001/Users").then((res) => res.json());
};

export const editUserGoal = (
  id: number,
  change: number | string | Object | undefined
) => {
  return fetch(`http://192.168.1.156:3001/Users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      calorie_goal: change,
    }),
  });
};

export const getAllFoods = () => {
  return fetch("http://192.168.1.156:3001/Foods").then((res) => res.json());
};

export const postFood = (food: Omit<TFood, "id">) => {
  return fetch("http://192.168.1.156:3001/Foods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  });
};

export const getAllEntries = () => {
  return fetch("http://192.168.1.156:3001/entries").then((res) => res.json());
};

export const postEntry = (entry: Omit<TEntry, "id">) => {
  return fetch("http://192.168.1.156:3001/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
};

export const getAllDays = () => {
  return fetch("http://192.168.1.156:3001/Days").then((res) => res.json());
};

export const setAllUsersFoods = (
  setter: (arg: TFood[]) => void,
  user: TUser
) => {
  getAllEntries().then((entries) => {
    const matchedEntries = entries.filter(
      (entry: TEntry) => entry.userId === user.id
    );
    getAllFoods()
      .then((foods) => {
        return foods.filter((food: TFood) =>
          matchedEntries.find((entry: TEntry) => entry.foodId === food.id)
        );
      })
      .then((userFoods) => setter(userFoods));
  });
};
