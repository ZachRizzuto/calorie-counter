"use client";
import { login } from "@/app/(utils)/requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { UserContentContext } from "../../Components/Providers/UserContentProvider";

export default function Login() {
  const { setIsLoggedIn, setUser, handleUserFoodData } = useContext(UserContentContext);
  const [form, setForm] = useState({
    user: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);

  const userRef = useRef<HTMLInputElement>(null);

  const { push } = useRouter();

  const reset = () => {
    setForm({
      user: "",
      password: "",
    });
  };
  return (
    <>
      <form
        className="bg-gray-800 p-8 flex flex-col min-h-72 m-auto relative justify-center items-center gap-6 w-1/3 top-1/3 border-green-500 border"
        onSubmit={async (e) => {
          e.preventDefault();

          await login({
            user: form.user,
            password: form.password
          }).then((res) => {
            localStorage.setItem("user", JSON.stringify(res))
            toast.success("Logged In")
            setUser({
              user: res.userInformation.user,
              balance: res.userInformation.balance,
              calorie_goal: res.userInformation.calorie_goal
            })
            setIsLoggedIn(true)
            handleUserFoodData()
            push("/today")
          }).catch((e) => console.log(e))

          reset();
        }}
      >
        <h1 className="text-5xl mt-0">Login!</h1>
        {isError && (
          <div className="bg-red-500 text-white p-2 rounded-md">
            Incorrect username or password! Try again!
          </div>
        )}
        <div>
          <label htmlFor="user">Username: </label>
          <input
            type="text"
            name="user"
            autoComplete="off"
            value={form.user}
            onChange={(e) =>
              setForm({
                ...form,
                user: e.target.value,
              })
            }
            ref={userRef}
          />
        </div>
        <div>
          <label htmlFor="pass">Password: </label>
          <input
            type="password"
            name="pass"
            autoComplete="off"
            value={form.password}
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Login"
            className="bg-gray-700 w-32 h-10 mr-8"
          />
          <Link
            href="/signup"
            className="text-white hover:text-gray-500 focus:text-gray-500"
          >
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
}
