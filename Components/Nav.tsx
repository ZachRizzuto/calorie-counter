"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
import styles from "../Components/Button.module.css";
import { Button } from "./Button";
import { UserContentContext } from "./Providers/UserContentProvider";

export const Nav = () => {
  const { push } = useRouter();
  const { isLoggedIn, resetState, user } = useContext(UserContentContext);
  return (
    <>
      <nav className="flex items-center justify-between min-h-[86px] w-full bg-light-dark-contrast shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
        <Image src={"/favicon.ico"} height={50} width={50} alt="logo" />
        <ul className="flex items-center gap-2 mr-4">
          <li>{user.balance}🪙</li>
          <li>
            <Link
              href="/food-store"
              className={`text-center text-white bg-light-contrast rounded-3xl relative ${styles.btnShadowAni} no-underline p-2 py-[13.5px]`}
            >
              Cheat Meals
            </Link>
          </li>
          <li>
            <Link
              href="/today"
              className={`text-center text-white bg-light-contrast rounded-3xl relative ${styles.btnShadowAni} no-underline p-2 py-[13.5px]`}
            >
              Calorie Log
            </Link>
          </li>
          <li>
            <Link
              href={"/profile"}
              className={`text-center text-white bg-light-contrast rounded-3xl relative ${styles.btnShadowAni} no-underline p-2 py-[13.5px]`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href={"/add-food"}
              className={`text-center text-white bg-light-contrast rounded-3xl relative ${styles.btnShadowAni} no-underline p-2 py-[13.5px]`}
            >
              Log A Meal
            </Link>
          </li>
          <li>
            <Button
              text={"Logout"}
              onClick={() => {
                push("/login");
                localStorage.removeItem("user");
                resetState();
                toast("Logged out!", {
                  icon: "👋",
                  duration: 1200,
                  style: {
                    backgroundColor: "#5285A4",
                    color: "white",
                  },
                });
              }}
              styles={isLoggedIn ? "hover:bg-red-600" : ""}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};
