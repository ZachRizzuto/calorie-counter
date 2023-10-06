"use client";
import { TEntry, TFood } from "@/types";
import { Entry } from "./Entry";
import { PageSection } from "./PageSection";
import { UserContext } from "./Providers/UserProvider";
import { useContext, useState } from "react";
import { deleteEntry } from "@/app/(utils)/requests";

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();

const dateToday = `${month + 1}/${day}/${year}`;

export const Today = () => {
  const {
    isLoggedIn,
    userFoods,
    user,
    todaysEntries,
    setTodaysEntries,
    totalCalories,
    setTotalCalories,
    todaysFood,
    setTodaysFood,
  } = useContext(UserContext);

  return (
    <>
      {isLoggedIn && (
        <PageSection
          styles={{
            height: "h-[90%]",
            width: "w-full",
          }}
        >
          <div className="flex justify-between border-b-2 border-solid w-full pb-2">
            <h1 className="inline text-5xl">Today</h1>
            <h2 className="inline text-4xl">{dateToday}</h2>
          </div>
          <div className="overflow-scroll max-h-[450px] w-full h-full text-xl">
            {todaysEntries.length > 0 ? (
              todaysEntries.map((entry: TEntry) => {
                const food = userFoods.find((food) => entry.foodId === food.id);

                if (food) {
                  return (
                    <Entry
                      calories={food.calories}
                      foodName={food.food}
                      amount={food.amount}
                      key={entry.id}
                      deleteEntry={() =>
                        deleteEntry(entry.id).then((res) => {
                          if (res.ok) {
                            setTodaysEntries(
                              todaysEntries.filter((ent) => ent.id !== entry.id)
                            );

                            setTodaysFood(
                              todaysFood.filter(
                                (todayFood) => todayFood.id !== food.id
                              )
                            );

                            setTotalCalories(totalCalories - food.calories);
                          } else {
                            throw new Error("Couldn't Delete Food :(");
                          }
                        })
                      }
                    />
                  );
                }
              })
            ) : (
              <h2 className="mt-6 text-center">No food entries for today!</h2>
            )}
          </div>
          <div className="flex justify-between items-center border-t-2 border-solid w-full p-2 mt-2">
            <h1 className="text-4xl">Total</h1>
            <p
              className={
                totalCalories < user.calorie_goal
                  ? `text-6xl text-green-500 `
                  : `text-6xl text-red-500 `
              }
            >
              {totalCalories} kcal
            </p>
          </div>
        </PageSection>
      )}
    </>
  );
};
