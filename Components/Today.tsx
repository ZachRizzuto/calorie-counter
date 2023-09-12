"use client";
import { getAllEntries, getAllFoods } from "@/app/(utils)/requests";
import { Entry } from "./Entry";
import { PageSection } from "./PageSection";
import { UserContext } from "./Providers/UserProvider";
import { useContext, useEffect, useState } from "react";
import { TEntry, TFood } from "@/types";

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();

export const Today = () => {
  const { userFoods } = useContext(UserContext);

  const totalCalories = userFoods.reduce((acc, num) => acc + num.calories, 0);

  return (
    <>
      <PageSection
        styles={{
          height: "h-[90%]",
          width: "w-full",
        }}
      >
        <div className="flex justify-between border-b-2 border-solid w-full pb-2">
          <h1 className="inline text-5xl">Today</h1>
          <h2 className="inline text-4xl">{`${month + 1}/${day}/${year}`}</h2>
        </div>
        <div className="overflow-scroll max-h-[450px] w-full h-full p-2 text-xl">
          {userFoods.map((food) => {
            return (
              <Entry
                calories={food.calories}
                foodName={food.food}
                amount={food.amount}
                key={food.id}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-center border-t-2 border-solid w-full p-2 mt-2">
          <h1 className="text-4xl">Total</h1>
          <p className="text-6xl text-green-500 ">{totalCalories} kcal</p>
        </div>
      </PageSection>
    </>
  );
};
