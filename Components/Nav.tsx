"use client";
import Image from "next/image";
import styles from "../Components/Button.module.css";
import { LogContext } from "./Providers/LogProvider";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./Button";

export const Nav = () => {
  const { push } = useRouter();
  return (
    <>
      <nav className="flex items-center justify-between h-24 w-full bg-gray-800">
        <Image src={"/favicon.ico"} height={50} width={50} alt="logo" />
        <ul className="flex items-center gap-2 mr-4">
          <li>
            <Link
              href="/food-store"
              className={`text-center text-white bg-gray-700 rounded-md relative ${styles.btnShadowAni} no-underline p-2`}
            >
              Buy Food
            </Link>
          </li>
          <li>
            <Link
              href="/today"
              className={`text-center text-white bg-gray-700 rounded-md relative ${styles.btnShadowAni} no-underline p-2`}
            >
              Today
            </Link>
          </li>
          <li>
            <Link
              href={"/profile"}
              className={`text-center text-white bg-gray-700 rounded-md relative ${styles.btnShadowAni} no-underline p-2`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href={"/add-food"}
              className={`text-center text-white bg-gray-700 rounded-md relative ${styles.btnShadowAni} no-underline p-2`}
            >
              Add Food
            </Link>
          </li>
          <li>
            <Button
              text={"Logout"}
              onClick={() => {
                push("/login");
                // localStorage.removeItem("user");
                // setIsLoggedIn(false);
              }}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};
