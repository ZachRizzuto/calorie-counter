"use client";
import {
  deleteEntry,
  getJwtTokenFromLocalStorage,
} from "@/app/(utils)/requests";
import { TEntry } from "@/types";
import { useContext } from "react";
import { Entry } from "./Entry";
import { PageSection } from "./PageSection";
import { UserContentContext } from "./Providers/UserContentProvider";

export const Today = () => {
  const {
    isLoggedIn,
    allFoods,
    user,
    todaysEntries,
    setTodaysEntries,
    totalCalories,
    setTotalCalories,
    today,
  } = useContext(UserContentContext);

  return (
    <>
      {isLoggedIn && (
        <PageSection
          styles={{
            height: "h-[90%]",
            width: "xs:w-[95%] md:w-full",
            custom: "p-2 m-auto flex-col",
          }}
        >
          <div className="flex justify-between border-b-2 border-solid w-full pb-2 gap-2">
            <h1 className="inline xs:text-3xl lg:text-5xl">Today</h1>
            <h2 className="inline xs:text-2xl lg:text-4xl">{today.date}</h2>
          </div>
          <div className="overflow-y-scroll md:max-h-[450px] w-full h-full text-xl overflow-x-none">
            {todaysEntries.length > 0 ? (
              todaysEntries.map((entry: TEntry) => {
                const food = allFoods.find((food) => entry.foodId === food.id);

                if (food) {
                  return (
                    <Entry
                      calories={food.calories}
                      foodName={food.food}
                      amount={food.amount}
                      key={entry.id}
                      deleteEntry={() =>
                        deleteEntry(
                          entry.id,
                          getJwtTokenFromLocalStorage()
                        ).then((res) => {
                          if (res.ok) {
                            setTodaysEntries(
                              todaysEntries.filter((ent) => ent.id !== entry.id)
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
            <h1 className="xs:text-xl md:text-4xl">Total</h1>
            <p
              className={
                totalCalories < user.calorie_goal
                  ? `xs:text-2xl md:text-6xl text-green-500 `
                  : `xs:text-2xl md:text-6xl text-red-500 `
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
