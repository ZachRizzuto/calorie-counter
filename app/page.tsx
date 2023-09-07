"use client";
import Link from "next/link";
import styles from "../Components/Button.module.css";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { LogContext } from "@/Components/Providers/LogProvider";
import { getUsers } from "./(utils)/requests";
import { TUser } from "@/types";

export default function Home() {
  const { push } = useRouter();
  const { setUser } = useContext(LogContext);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (typeof isLoggedIn === "string") {
      const parsedData = JSON.parse(isLoggedIn);
      getUsers()
        .then((users) =>
          users.find(
            (data: TUser) =>
              data.user === parsedData.user &&
              data.password === parsedData.password
          )
        )
        .then((user) => setUser(user));
    }
    if (isLoggedIn) {
      push("/today");
    }
  });

  return (
    <>
      <div
        className={"w-full h-full flex flex-col items-center justify-center"}
      >
        <h1>Welcome! Please Login!</h1>
        <Link href={"/login"} className={styles.btnShadowAni}>
          Login
        </Link>
      </div>
    </>
  );
}
