import { TEntry, TFood } from "@/types";
import { Button } from "./Button";
import styles from "./Entry.module.css";
import { useState } from "react";

type Props = {
  foods: TFood[];
  createdAt: string;
  mealType: string;
  mealName: string;
  deleteEntry: () => void;
};

export const Entry = ({
  foods,
  createdAt,
  mealType,
  mealName,
  deleteEntry,
}: Props) => {
  const [showHamburger, setShowHamburger] = useState(false);

  const createdDate = new Date(parseInt(createdAt));

  const hours = createdDate.getHours();

  const minutes = createdDate.getMinutes();

  return (
    <>
      <div
        className={`border-b-[1px] border-solid flex items-center justify-between p-1 ${
          showHamburger ? "border-green-500" : "border-neutral-400"
        } ${styles.deleteShow} hover:border-green-500`}
      >
        <div className="flex items-center justify-between gap-6">
          <div className="xs:w-[100%] lg:w-[300px] xs:text-sm lg:text-xl whitespace-nowrap">
            {mealName}
          </div>
          <div className="xs:w-[100%] lg:w-[400px] xs:text-sm lg:text-xl flex gap-2 items-center">
            {mealType}
            <button
              className={`${showHamburger ? "rotate-[-180deg]" : ""}`}
              onClick={() =>
                showHamburger ? setShowHamburger(false) : setShowHamburger(true)
              }
            >
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>
        </div>
        <div className="xs:text-sm lg:text-xl whitespace-nowrap xs:ml-[6px] lg:ml-0 xs:mr-[6px] lg:mr-0 flex justify-between w-[25%]">
          <div>{foods.reduce((acc, val) => (acc += val.calories), 0)} kcal</div>
          <div>{`${hours}:${minutes}`}</div>
        </div>
        <Button
          text="Delete"
          styles="xs:opacity-100 lg:opacity-0 hover:bg-red-700 p-[5px] lg:text-xl xs:text-xs"
          onClick={() => deleteEntry()}
        />
      </div>
      <div
        className={`transition-max-height duration-300 flex flex-col origin-top-left ${
          showHamburger ? "scale-y-100" : "scale-y-0 max-h-0 overflow-hidden"
        } border-b-2 border-l-2 border-r-2 p-2 border-green-500 rounded-b-pill`}
      >
        {foods.map((food, index) => {
          return (
            <div
              key={index}
              className={`flex justify-between w-[40%] ${
                showHamburger
                  ? "scale-y-100"
                  : "scale-y-0 max-h-0 overflow-hidden"
              }`}
            >
              <div>{food.amount}</div>
              <div>{food.food}</div>
              <div>{food.calories} kcal</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
