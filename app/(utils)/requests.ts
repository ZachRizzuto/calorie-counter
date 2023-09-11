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
