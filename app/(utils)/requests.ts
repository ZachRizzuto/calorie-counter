import { TDay, TEntry, TFood, TUser } from "@/types";

const baseUrl = "http://localhost:3001"

export const getUsers = (): Promise<TUser[]> => {
  return fetch(`${baseUrl}/Users`)
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
  return fetch(`${baseUrl}/Users/${id}`, {
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
  return fetch(`${baseUrl}/Foods`).then((res) => res.json());
};

export const postFood = (food: Omit<TFood, "id">) => {
  return fetch(`${baseUrl}/Foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  });
};

export const deleteEntry = (id: number) => {
  return fetch(`${baseUrl}/entries/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllEntries = () => {
  return fetch(`${baseUrl}/entries`).then((res) => res.json());
};

export const postEntry = (entry: Omit<TEntry, "id">) => {
  return fetch(`${baseUrl}/entries`, {
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
  return fetch(`${baseUrl}/Days`).then((res) => res.json());
};

export const newDay = (userId: number, date: string) => {
  return fetch(`${baseUrl}/Days`, {
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

export const buyFood = (cost: number, prevBalance: number, userId: number) => {
  const newBalance = prevBalance - cost;

  if (newBalance >= 0) {
    return fetch(`${baseUrl}/Users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        balance: newBalance,
      }),
    });
  } else {
    throw new Error("Cannot process purchase");
  }
};
