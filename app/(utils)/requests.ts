import { TEntry, TFood, TUser } from "@/types";

const baseUrl = "http://localhost:3001";

type jwtToken = {
  token: string;
  userData: {
    user: string;
    balance: number;
    calorie_goal: number;
  };
};

export const getUsers = (): Promise<TUser[]> => {
  return fetch(`${baseUrl}/users`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Couldn't retrieve user data.");
      } else return res;
    })
    .then((res) => res.json());
};

export const login = (user: { user: string; password: string }) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((userData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    })
    .catch((error) => console.log(error));
};

export const loginFromJwt = (token: jwtToken) => {
  return fetch(`${baseUrl}/auth/login/redirect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  })
    .then((res) => res.json())
    .then((userData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    })
    .catch((error) => console.log(error));
};

export const editUserGoal = (
  id: number,
  change: number | string | Object | undefined
) => {
  return fetch(`${baseUrl}/users/${id}`, {
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
  return fetch(`${baseUrl}/foods`).then((res) => res.json());
};

export const postFood = (food: Omit<TFood, "id">) => {
  return fetch(`${baseUrl}/foods`, {
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
  return fetch(`${baseUrl}/days/1`).then((res) => res.json());
};

export const newDay = (date: string) => {
  return fetch(`${baseUrl}/days`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: date,
    }),
  });
};

export const buyFood = (cost: number, prevBalance: number, userId: number) => {
  const newBalance = prevBalance - cost;

  if (newBalance >= 0) {
    return fetch(`${baseUrl}/users/${userId}`, {
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
