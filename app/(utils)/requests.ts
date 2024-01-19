import { TEntry, TFood, TUser } from "@/types";

const baseUrl = "http://localhost:3001";

const setAuthHeaders = (jwtToken: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${jwtToken}`);
  return headers;
};

export const getJwtTokenFromLocalStorage = (): string | undefined => {
  const userInfoS = localStorage.getItem("user");

  if (userInfoS) {
    const userInfo = JSON.parse(userInfoS);

    if (userInfo.token) return userInfo.token;
    else return undefined;
  } else return undefined;
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
  }).catch((error) => console.log(error));
};

export const loginFromJwt = (token: string | undefined) => {
  if (token === undefined)
    throw new Error("Unable to retrieve login information");

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
  change: number | string | Object | undefined,
  jwtToken: string | undefined
) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  return fetch(`${baseUrl}/users/`, {
    method: "PATCH",
    headers: setAuthHeaders(jwtToken),
    body: JSON.stringify({
      calorie_goal: change,
    }),
  });
};

export const getAllFoods = () => {
  return fetch(`${baseUrl}/foods`).then((res) => res.json());
};

export const postFood = (
  food: Omit<TFood, "id">,
  jwtToken: string | undefined
) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  return fetch(`${baseUrl}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(food),
  });
};

export const deleteEntry = (id: number, jwtToken: string | undefined) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  return fetch(`${baseUrl}/entries/${id}`, {
    method: "DELETE",
    headers: setAuthHeaders(jwtToken),
  });
};

export const getAllEntriesForUser = (
  jwtToken: string | undefined
): Promise<TEntry[]> => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  return fetch(`${baseUrl}/entries`, {
    headers: setAuthHeaders(jwtToken),
  }).then((res) => res.json());
};

export const getEntriesForUserByDay = (
  dayId: number,
  jwtToken: string | undefined
) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  return fetch(`${baseUrl}/entries/${dayId}`, {
    headers: setAuthHeaders(jwtToken),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Couldn't get entries");
      }
      return res.json();
    })
    .catch((e) => console.error(e));
};

export const postEntry = (
  entry: Omit<TEntry, "id" | "userId">,
  jwtToken: string | undefined
) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  return fetch(`${baseUrl}/entries`, {
    method: "POST",
    headers: setAuthHeaders(jwtToken),
    body: JSON.stringify(entry),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Couldn't post Entry");
    } else {
      return res.json();
    }
  });
};

export const getAllUsersDays = (jwtToken: string | undefined) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${jwtToken}`);
  return fetch(`${baseUrl}/days/`, {
    headers: headers,
  }).then((res) => res.json());
};

export const getDate = (date: string, jwtToken: string | undefined) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;

  const isValidDate = dateRegex.test(date);

  if (!isValidDate) throw new Error("Incorrect date format");

  return fetch(`${baseUrl}/days/${date}`, {
    headers: setAuthHeaders(jwtToken),
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

export const newDay = (date: string, jwtToken: string | undefined) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  return fetch(`${baseUrl}/days`, {
    method: "POST",
    headers: setAuthHeaders(jwtToken),
    body: JSON.stringify({
      date: date,
    }),
  });
};

export const buyFood = (
  cost: number,
  prevBalance: number,
  jwtToken: string | undefined,
  user: string
) => {
  const newBalance = prevBalance - cost;

  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  if (newBalance >= 0) {
    return fetch(`${baseUrl}/users/${user}/balance`, {
      method: "PATCH",
      headers: setAuthHeaders(jwtToken),
      body: JSON.stringify({
        balance: newBalance,
      }),
    });
  } else {
    throw new Error("Cannot process purchase");
  }
};

export const addToUserBalance = (
  addition: number,
  prevBalance: number,
  jwtToken: string | undefined,
  user: string
) => {
  if (jwtToken === undefined)
    throw new Error("Unable to retrieve login information");

  const newBalance = prevBalance + addition;

  return fetch(`${baseUrl}/users/${user}/balance`, {
    method: "PATCH",
    headers: setAuthHeaders(jwtToken),
    body: JSON.stringify({
      balance: newBalance,
    }),
  }).catch((e) => console);
};
