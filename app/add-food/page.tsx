"use client";
import { Button } from "@/Components/Button";
import { Header } from "@/Components/Header";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { UserContentContext } from "@/Components/Providers/UserContentProvider";
import { TEntry, TFood, TFoodForm } from "@/types";
import { getTime } from "@/utils/date";
import { validateEntry } from "@/utils/formvalidation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToUserBalance,
  getAllFoods,
  getJwtTokenFromLocalStorage,
  postEntry,
  postFood,
} from "../(utils)/requests";
import styles from "./food-form.module.css";

export default function AddFoodForm() {
  const {
    user,
    allFoods,
    setAllFoods,
    setUserEntries,
    today,
    userEntries,
    todaysEntries,
    setTodaysEntries,
    setTotalCalories,
    totalCalories,
    setUser,
  } = useContext(UserContentContext);

  const [formEntry, setFormEntry] = useState<TFoodForm>({
    foodSelect: "",
    amount: "",
    amountType: "oz",
    food: "",
    calories: "",
  });

  const [selectedFoods, setSelectedFoods] = useState<TFood[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.add(styles.entry);
      });
    });

    const form = document.querySelector("#form");
    if (form) {
      observer.observe(form);
    }
  });

  return (
    <>
      <PageWrapper>
        <Nav />
        <div
          id="form"
          className={`flex text-white items-center justify-center h-[100vh] w-full p-[30px] gap-2 ${styles.formTransition} `}
        >
          <PageSection
            styles={{
              height: "h-full",
              width: "w-[98%]",
              custom: "gap-12",
            }}
          >
            <div className="w-[70%] h-full">
              <div className="border-b-2">
                <h1 className="text-4xl">Create a Meal!</h1>
                <p>Click add food to add that food to your meal!</p>
              </div>
              <div className="flex flex-col h-[85%] overflow-scroll"></div>
              <div className="w-[35%] ml-auto">
                <p className="inline mr-4">{`Don't see your food?`}</p>
                <Button text="Create Food" styles="bg-light-contrast"></Button>
              </div>
            </div>
            <div className="w-[30%] h-full border-l-2 pl-2">
              <div className="border-b-2">
                <h2 className="text-4xl">Log Your Meal!</h2>
                <p>After building meal hit log meal to log your entry!</p>
              </div>
            </div>
          </PageSection>
        </div>
      </PageWrapper>
    </>
  );
}
