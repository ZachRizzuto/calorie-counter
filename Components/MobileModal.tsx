import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
import styles from "../Components/Button.module.css";
import { Button } from "./Button";
import { UserContentContext } from "./Providers/UserContentProvider";

export const MobileModal = ({ show }: { show: boolean }) => {
  const { isLoggedIn, resetState, user } = useContext(UserContentContext);
  const { push } = useRouter();
  return (
    <div
      className={`absolute flex items-center rounded-md w-[320px] h-[300px] bg-light-contrast xs:top-[86px] sm:top-[100px] z-10 ${
        show ? "right-0" : "right-[-321px]"
      }`}
    >
      <ul className="flex flex-col items-center gap-6 justify-center m-auto">
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
            styles={`${isLoggedIn ? "hover:bg-red-600" : ""}`}
          />
        </li>
      </ul>
    </div>
  );
};
