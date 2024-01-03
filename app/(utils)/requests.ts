import { TEntry, TFood, TUser } from "@/types";

const baseUrl = "http://localhost:3001";

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

export const loginFromJwt = (token: string) => {
  return fetch(`${baseUrl}/auth/login/redirect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((res) => res.json())
    .then((userData) => {
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

export const postFood = (food: Omit<TFood, "id">, jwtToken: string) => {
  return fetch(`${baseUrl}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(food),
  });
};

export const deleteEntry = (id: number, jwtToken: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${jwtToken}`);
  return fetch(`${baseUrl}/entries/${id}`, {
    method: "DELETE",
    headers: headers,
  });
};

export const getAllEntries = (): Promise<TEntry> => {
  return fetch(`${baseUrl}/entries`).then((res) => res.json());
};

export const getEntriesForUserByDay = (dayId: number, jwtToken: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${jwtToken}`);
  return fetch(`${baseUrl}/entries/${dayId}`, {
    headers: headers,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Couldn't get entries");
      }
      return res.json();
    })
    .catch((e) => console.error(e));
};

export const postEntry = (entry: Omit<TEntry, "id">, jwtToken: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${jwtToken}`);
  return fetch(`${baseUrl}/entries`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(entry),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Couldn't post Entry");
    } else {
      return res.json();
    }
  });
};

export const getAllUsersDays = (jwtToken: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwtToken}`);
  return fetch(`${baseUrl}/days/`, {
    headers: headers,
  }).then((res) => res.json());
};

export const getDate = (date: string, jwtToken: string) => {
  const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;

  const isValidDate = dateRegex.test(date);

  if (!isValidDate) throw new Error("Incorrect date format");

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${jwtToken}`);
  return fetch(`${baseUrl}/days/${date}`, {
    headers: headers,
  })
    .then((res) => {
      if (res.status === 204) {
        return undefined;
      } else {
        return res.json();
      }
    })
    .catch((e) => console.error(e));
};

export const newDay = (date: string, jwtToken: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${jwtToken}`);
  return fetch(`${baseUrl}/days`, {
    method: "POST",
    headers: headers,
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
