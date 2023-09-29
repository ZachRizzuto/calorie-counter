import { TDay, TEntry, TFood, TUser } from "@/types";

export const getUsers = (): Promise<TUser[]> => {
  return fetch("http://192.168.1.156:3001/Users")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Couldn't retrieve user data.");
      } else return res;
    })
    .then((res) => res.json());
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

export const deleteEntry = (id: number) => {
  return fetch(`http://192.168.1.156:3001/entries/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Couldn't delete Entry");
    }
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
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Couldn't delete Entry");
    } else {
      return res.json();
    }
  });
};

export const getAllDays = () => {
  return fetch("http://192.168.1.156:3001/Days").then((res) => res.json());
};

export const newDay = (userId: number, date: string) => {
  return fetch("http://192.168.1.156:3001/Days", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      date: date,
    }),
  });
};
