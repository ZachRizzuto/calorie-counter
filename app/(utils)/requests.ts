export const getUsers = () => {
  return fetch("http://192.168.1.156:3001/Users").then((res) => res.json());
};
