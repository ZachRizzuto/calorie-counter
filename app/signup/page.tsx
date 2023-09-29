import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

async function createUser(data: FormData) {
  "use server";

  const user = data.get("username")?.valueOf();
  const password = data.get("password")?.valueOf();

  const userObj = {
    user: user,
    password: password,
    calorie_goal: 2000,
  };

  await fetch("http://192.168.1.156:3001/Users", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  redirect("/login");
}

export default function SignUpForm() {
  return (
    <>
      <form
        className="bg-gray-800 p-8 flex flex-col min-h-72 m-auto relative justify-center items-center gap-6 w-1/3 top-1/3"
        action={createUser}
      >
        <h1 className="text-5xl mt-0">Sign Up!</h1>
        <div>
          <label htmlFor="user">Username: </label>
          <input type="text" name="username" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="pass">Password: </label>
          <input type="password" name="password" autoComplete="off" />
        </div>
        <div>
          <input
            type="submit"
            value="Sign Up"
            className="bg-gray-700 w-32 h-10 mr-8"
          />
          <Link
            href="/login"
            className="text-white hover:text-gray-500 focus-gray-500"
          >
            Login
          </Link>
        </div>
      </form>
    </>
  );
}
