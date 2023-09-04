"use client";
import Image from "next/image";
import { Button } from "./Button";
import { LogContext } from "./Providers/LogProvider";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Nav = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogContext);
  const { push } = useRouter();

  useEffect(() => {
    !isLoggedIn && push("/login");
  }, [isLoggedIn, push]);
  return (
    <>
      <nav className="flex items-center justify-between h-24 w-full bg-gray-800">
        <Image src={"/favicon.ico"} height={50} width={50} alt="logo" />
        <ul className="flex gap-2 pr-4">
          <li>
            <Button text={"Buy Food"} onClick={() => null} />
          </li>
          <li>
            <Button text={"Today"} onClick={() => null} />
          </li>
          <li>
            <Button text={"Profile"} onClick={() => null} />
          </li>
          <li>
            <Button text={"Add Food"} onClick={() => null} />
          </li>
          <li>
            <Button
              text={"Logout"}
              onClick={() => {
                localStorage.removeItem("user");
                setIsLoggedIn(false);
              }}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};
