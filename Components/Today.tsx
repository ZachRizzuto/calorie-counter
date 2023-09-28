"use client";
import { Entry } from "./Entry";
import { PageSection } from "./PageSection";
import { UserContext } from "./Providers/UserProvider";
import { useContext } from "react";

const date = new Date();
const month = date.getMonth();
const day = date.getDate();
const year = date.getFullYear();

const dateToday = `${month + 1}/${day}/${year}`;

export const Today = () => {
  const { isLoggedIn, deleteFood, userEntries, todaysFood, user } =
    useContext(UserContext);

  const totalCalories = todaysFood.reduce((acc, num) => acc + num.calories, 0);

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
            {todaysFood.length > 0 ? (
              todaysFood.map((food) => {
                return (
                  <Entry
                    calories={food.calories}
                    foodName={food.food}
                    amount={food.amount}
                    key={food.id}
                    deleteEntry={() => {
                      const entry = userEntries.find(
                        (entry) => entry.foodId === food.id
                      );
                      if (entry) {
                        deleteFood(entry, food.id);
                      }
                    }}
                  />
                );
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
