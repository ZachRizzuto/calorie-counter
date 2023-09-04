"use client";
import Link from "next/link";
import styles from "../Components/Button.module.css";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1>Welcome! Please Login!</h1>
        <Link href={"/login"} className={styles.btnShadowAni}>
          Login
        </Link>
      </div>
    </>
  );
}
