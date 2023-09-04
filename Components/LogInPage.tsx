"use client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { LogContext } from "./Providers/LogProvider";
import { useRouter } from "next/navigation";

type TUser = {
  id: number;
  user: string;
  password: string;
  calorie_goal: number;
};

const getAllData = () =>
  fetch("http://localhost:3001/Users/").then((res) => res.json());

export const LogInPage = () => {
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [users, setUsers] = useState<TUser[]>([]);
  const [isError, setIsError] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(LogContext);
  const { push } = useRouter();

  const userRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setUserInput("");
    setPassInput("");
  };

  useEffect(() => {
    getAllData().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    isLoggedIn && push("/today");
  }, [isLoggedIn, push]);

  const content = (
    <form
      className="bg-gray-800 p-10 flex flex-col h-72 m-auto relative justify-center items-center gap-6 w-1/3 top-1/3"
      onSubmit={(e) => {
        e.preventDefault();

        const user = {
          user: userInput,
          password: passInput,
        };

        const userMatch = users.find(
          (person) =>
            person.user === user.user && person.password === user.password
        );

        if (userMatch) {
          localStorage.setItem("user", JSON.stringify(user));
          setIsLoggedIn(true);
        } else {
          setIsError(true);
          userRef.current?.focus();
        }

        reset();
      }}
    >
      {isError && (
        <div className="w-full text-center text-white bg-red-600 rounded-md">
          Username or Password is Incorrect!
        </div>
      )}
      <div>
        <label htmlFor="user">Username: </label>
        <input
          type="text"
          name="user"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          autoComplete="off"
          ref={userRef}
        />
      </div>
      <div>
        <label htmlFor="pass">Password: </label>
        <input
          type="text"
          name="pass"
          value={passInput}
          onChange={(e) => setPassInput(e.target.value)}
          autoComplete="off"
        />
      </div>
      <div>
        <input
          type="submit"
          value="Login"
          className="bg-gray-700 w-32 h-10 mr-8"
        />
        <Link href="/">Sign up</Link>
      </div>
    </form>
  );

  return content;
};
