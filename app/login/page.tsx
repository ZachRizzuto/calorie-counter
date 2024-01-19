"use client";
import { login } from "@/app/(utils)/requests";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { UserContentContext } from "../../Components/Providers/UserContentProvider";

export default function Login() {
  const { setIsLoggedIn, setUser, handleUserFoodData } =
    useContext(UserContentContext);
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
        className="bg-light-dark-contrast p-8 flex flex-col min-h-72 m-auto relative justify-center items-center gap-6 sm:w-1/3 xs:w-[60%] top-1/3 border-green-500 border"
        onSubmit={async (e) => {
          e.preventDefault();

          await login({
            user: form.user,
            password: form.password,
          })
            .then((res) => {
              if (res) {
                return res;
              } else {
                throw new Error("Couldn't Resolve Login Request");
              }
            })
            .then((res) => {
              if (!res.ok) {
                setIsError(true);
                userRef.current?.focus();
                toast.error("Invalid Credentials");
                return undefined;
              } else return res.json();
            })
            .then((res) => {
              if (res) {
                localStorage.setItem("user", JSON.stringify(res));
                toast.success("Logged In", {
                  style: {
                    backgroundColor: "#5285A4",
                    color: "white",
                  },
                });
                setUser({
                  user: res.userInformation.user,
                  balance: res.userInformation.balance,
                  calorie_goal: res.userInformation.calorie_goal,
                });
                setIsLoggedIn(true);
                handleUserFoodData();
                push("/today");
              }
            })
            .catch((e) => console.log(e));

          reset();
        }}
      >
        <h1 className="text-5xl mt-0">Login!</h1>
        {isError && (
          <div className="bg-red-500 text-white p-2 rounded-md">
            Incorrect username or password! Try again!
          </div>
        )}
        <div className="w-full m-auto max-w-[300px]">
          <label htmlFor="user" className="w-[80%] m-auto max-w-[300px]">
            Username:{" "}
          </label>
          <div className="bg-white rounded-pill p-2 pt-[1px] pb-[1px] w-[80%] m-auto max-w-[300px]">
            <input
              type="text"
              name="user"
              autoComplete="off"
              value={form.user}
              onChange={(e) => {
                setForm({
                  ...form,
                  user: e.target.value,
                });
                if (isError) {
                  setIsError(false);
                }
              }}
              ref={userRef}
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </div>
        </div>
        <div className="w-full m-auto max-w-[300px]">
          <label htmlFor="pass" className="w-[80%] m-auto">
            Password:{" "}
          </label>
          <div className="bg-white rounded-pill p-2 pt-[1px] pb-[1px] w-[80%] m-auto max-w-[300px]">
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
                if (isError) {
                  setIsError(false);
                }
              }}
              style={{
                width: "100%",
                maxWidth: "300px",
              }}
            />
          </div>
        </div>
        <div className="lg:block xs:flex xs:flex-col xs:items-center xs:justify-center">
          <input
            type="submit"
            value="Login"
            className="bg-success text-dark-contrast w-32 h-10 lg:mr-8"
          />
          <Link
            href="/signup"
            className="text-white hover:text-success focus:text-success xs:mt-2 lg:mt-auto"
          >
            Sign up
          </Link>
        </div>
      </form>
    </>
  );
}
