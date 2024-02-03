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
import { divide } from "lodash-es";
import CreateFoodModal from "@/Components/CreateFoodModal";
import FoodOption from "@/Components/FoodOption";

export type WithKey<T> = T & { key: number };

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

  const [key, setKey] = useState(0);

  const [formEntry, setFormEntry] = useState<TFoodForm>({
    foodSelect: "",
    amount: "",
    amountType: "oz",
    food: "",
    calories: "",
  });

  const [selectedFoods, setSelectedFoods] = useState<WithKey<TFood>[]>([]);

  const [mealEntryForm, setMealEntryForm] = useState({
    mealType: "Snack🥝️",
    mealName: "",
    foodIds: [],
  });

  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setMealEntryForm({
      mealType: "Snack🥝️",
      mealName: "",
      foodIds: [],
    });
    setSelectedFoods([]);
    setKey(0);
  };

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
          className={`flex text-white items-center justify-center h-[90vh] w-full p-[30px] gap-2 ${styles.formTransition} `}
        >
          <PageSection
            styles={{
              height: "h-full max-h-[100%]",
              width: "w-[98%]",
              custom: "gap-12 overflow-none",
            }}
          >
            <div className="w-[70%] h-full">
              <div className="border-b-2">
                <h1 className="text-4xl">Create a Meal!</h1>
                <p>Click add food to add that food to your meal!</p>
              </div>
              <div className="flex flex-col h-[85%] overflow-scroll gap-2">
                {allFoods.map((mapFood) => (
                  <FoodOption
                    key={mapFood.id}
                    food={mapFood}
                    selectedFoods={selectedFoods}
                    setSelectedFoods={(selectedFoods) =>
                      setSelectedFoods(selectedFoods)
                    }
                    selectedFoodsKey={key}
                    setSelectedFoodsKey={(key) => setKey(key)}
                  />
                ))}
              </div>
              <div className="w-[35%] ml-auto">
                <p className="inline mr-4">{`Don't see your food?`}</p>
                <Button
                  text="Create Food"
                  styles="bg-light-contrast"
                  onClick={() => setShowModal(true)}
                ></Button>
              </div>
            </div>
            <div className="w-[30%] h-full border-l-2 pl-2">
              <div className="border-b-2 mb-2">
                <h2 className="text-4xl">Log Your Meal!</h2>
                <p>After building meal hit log meal to log your entry!</p>
              </div>
              <form
                className="m-auto h-[85%] w-[98%] bg-light-contrast rounded-pill p-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success(`Added meal sucessfully`);
                  resetForm();
                }}
              >
                <div className="border-b-2 m-auto pb-2">
                  <div>
                    <label htmlFor="meal-type" className="inline mr-2">
                      What kind of meal is this?:
                    </label>
                    <select
                      value={mealEntryForm.mealType}
                      onChange={(e) =>
                        setMealEntryForm({
                          ...mealEntryForm,
                          mealType: e.target.value,
                        })
                      }
                      name="meal-type"
                      id="meal-type"
                      className=""
                    >
                      <option value="Snack">Snack🥝️</option>
                      <option value="Breakfast">Breakfast🥞️</option>
                      <option value="Brunch">Brunch🥂️</option>
                      <option value="Lunch">Lunch🍕️</option>
                      <option value="Dinner">Dinner🍝️</option>
                    </select>
                  </div>
                  <label htmlFor="meal-name" className="inline mr-2">
                    What do you want to name this meal?:
                  </label>
                  <input
                    type="text"
                    className="w-full"
                    value={mealEntryForm.mealName}
                    onChange={(e) =>
                      setMealEntryForm({
                        ...mealEntryForm,
                        mealName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col border-b-2 overflow-scroll h-[70%] max-h-[70%]">
                  {selectedFoods.map((mapFood) => (
                    <div key={mapFood.key}>
                      <p>{mapFood.food}</p>
                      <button
                        onClick={() =>
                          setSelectedFoods(
                            selectedFoods.filter(
                              (food) => mapFood.key !== food.key
                            )
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-[5%] w-[70%]">
                  <Button
                    text="Log Meal"
                    type="submit"
                    styles="bg-success text-dark-contrast w-[50%]"
                  />
                  <p className="text-xl">
                    Total:{" "}
                    {selectedFoods.reduce(
                      (acc, currVal) => (acc += currVal.calories),
                      0
                    )}{" "}
                    kcal
                  </p>
                </div>
              </form>
            </div>
          </PageSection>
        </div>
      </PageWrapper>
      <CreateFoodModal
        display={showModal}
        setShowModal={(val: boolean) => setShowModal(val)}
      />
    </>
  );
}
