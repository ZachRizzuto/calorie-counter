export default async function getAllUsers() {
  const res = await fetch("http://192.168.1.156:3001/Users");
  if (!res.ok) throw new Error("Failed to fetch data.");
  return res.json();
}
