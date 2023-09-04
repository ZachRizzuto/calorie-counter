"use client";
import { LogInPage } from "@/Components/LogInPage";
import { LogContext } from "@/Components/Providers/LogProvider";
import { useContext, useEffect } from "react";

export default function Login() {
  const { setIsLoggedIn } = useContext(LogContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    user && setIsLoggedIn(true);
  });
  return <LogInPage />;
}
