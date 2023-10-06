"use client";
import Link from "next/link";
import styles from "../Components/Button.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");

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
