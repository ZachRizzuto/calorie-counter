"use client";
import { Button } from "@/Components/Button";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import { UserContentContext } from "@/Components/Providers/UserContentProvider";
import { TEntry, TFood, TFoodForm } from "@/types";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToUserBalance,
  getJwtTokenFromLocalStorage,
  postEntry,
} from "../(utils)/requests";
import styles from "./food-form.module.css";
import CreateFoodModal from "@/Components/CreateFoodModal";
import FoodOption from "@/Components/FoodOption";
import AddFoodModal from "@/Components/AddFoodModal";

export type WithKey<T> = T & { key: number };

export default function AddFoodForm() {
  const {
    user,
    allFoods,
    today,
    todaysEntries,
    setTodaysEntries,
    setTotalCalories,
    totalCalories,
    setUser,
  } = useContext(UserContentContext);

  const [foodKey, setKey] = useState(0);

  const [formEntry, setFormEntry] = useState<TFoodForm>({
    foodSelect: "",
    amount: "",
    amountType: "oz",
    food: "",
    calories: "",
  });

  const [selectedFoods, setSelectedFoods] = useState<WithKey<TFood>[]>([]);

  const [mealEntryForm, setMealEntryForm] = useState<{
    mealType: string;
    mealName: string;
    foodIds: number[];
  }>({
    mealType: "Snack🥝️",
    mealName: "",
    foodIds: [],
  });

  const [showCreateFoodModal, setShowCreateFoodModal] = useState(false);

  const [showAddFoodModal, setShowAddFoodModal] = useState(false);

  const [searchInput, setSearchInput] = useState("");

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
  }, []);

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
            <div className="w-[70%] h-full flex flex-col gap-2 xs:hidden lg:flex">
              <div className="flex border-b-2 items-center justify-between">
                <div className="">
                  <h1 className="lg:text-2xl xl:text-4xl">Create a Meal!</h1>
                  <p className="lg:text-[67%] ml-[2px]">
                    Click add food to add that food to your meal!
                  </p>
                </div>
                <div className="flex gap-2">
                  <label htmlFor="search-foods">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </label>
                  <input
                    id="search-foods"
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value.toLowerCase());
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col h-[85%] overflow-scroll gap-2 p-2">
                {allFoods
                  .filter((food) =>
                    food.food.toLowerCase().includes(searchInput)
                  )
                  .map((mapFood) => {
                    return (
                      <FoodOption
                        key={mapFood.id}
                        food={mapFood}
                        selectedFoods={selectedFoods}
                        setSelectedFoods={(selectedFoods) =>
                          setSelectedFoods(selectedFoods)
                        }
                        selectedFoodsKey={foodKey}
                        setSelectedFoodsKey={(key) => setKey(key)}
                      />
                    );
                  })}
              </div>
              <div className="w-[40%] ml-auto flex justify-end items-center">
                <p className="inline mr-4 lg:text-sm md:text-xs">{`Don't see your food?`}</p>
                <Button
                  text="Create Food"
                  styles="bg-light-contrast lg:text-xs"
                  onClick={() => setShowCreateFoodModal(true)}
                ></Button>
              </div>
            </div>
            <div className="xs:w-full lg:w-[30%] h-full lg:border-l-2 pl-2">
              <div className="border-b-2 mb-2">
                <h2 className="lg:text-2xl xl:text-4xl lg:text-left xs:text-center">
                  Log Your Meal!
                </h2>
                <p className="md:text-[67%] lg:text-left xs:text-center">
                  After building meal hit log meal to log your entry!
                </p>
              </div>
              <form
                className="m-auto h-[85%] w-[98%] bg-light-contrast rounded-pill p-2 flex flex-col"
                onSubmit={async (e) => {
                  e.preventDefault();

                  const selectedFoodIds = selectedFoods.map((food) => food.id);

                  setMealEntryForm((prevMealEntryForm) => ({
                    ...prevMealEntryForm,
                    foodIds: selectedFoodIds,
                  }));

                  const newEntry = {
                    dayId: today.id,
                    mealName: mealEntryForm.mealName,
                    mealType: mealEntryForm.mealType,
                    foodsIds: selectedFoodIds,
                  };

                  if (
                    !Object.values(newEntry).includes("") &&
                    selectedFoodIds.length > 0
                  ) {
                    await postEntry(newEntry, getJwtTokenFromLocalStorage())
                      .then((entry: TEntry) => {
                        const totalCals = entry.foods.reduce(
                          (acc, val) => (acc += val.food.calories),
                          0
                        );

                        if (
                          totalCals <= user.calorie_goal / 3 &&
                          totalCalories + totalCals <= user.calorie_goal
                        ) {
                          addToUserBalance(
                            1,
                            user.balance,
                            getJwtTokenFromLocalStorage(),
                            user.user
                          )
                            .then(() => {
                              toast.success(
                                "Good job! Heres some coins. 1+ 🪙"
                              );
                              setUser({ ...user, balance: user.balance + 1 });
                            })
                            .catch((e) => console.log(e));
                        }

                        setTodaysEntries([...todaysEntries, entry]);

                        setTotalCalories(totalCalories + totalCals);

                        toast.success("Entry Added");
                      })
                      .catch((e) => console.log(e))
                      .finally(() => resetForm());
                  } else {
                    toast.error("Meal must have name and foods selected");
                  }
                }}
              >
                <div className="border-b-2 m-auto pb-2">
                  <div>
                    <label
                      htmlFor="meal-type"
                      className="inline mr-2 xs:text-[80%] sm:text-sm xl:text-md"
                    >
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
                      className="sm:w-auto xs:w-full"
                    >
                      <option value="Snack🥝">Snack🥝</option>
                      <option value="Breakfast🥞">Breakfast🥞</option>
                      <option value="Brunch🥂">Brunch🥂</option>
                      <option value="Lunch🍕">Lunch🍕</option>
                      <option value="Dinner🍝">Dinner🍝</option>
                    </select>
                  </div>
                  <label
                    htmlFor="meal-name"
                    className="inline mr-2 xs:text-[80%] sm:text-xs xl:text-[95%]"
                  >
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
                    <div
                      key={mapFood.key}
                      className="flex border-b-2 border-white justify-between items-center py-2"
                    >
                      <p className="w-[50%]">{mapFood.food}</p>
                      <p className="text-left">{mapFood.calories} kcal</p>
                      <button
                        onClick={() =>
                          setSelectedFoods(
                            selectedFoods.filter(
                              (food) => mapFood.key !== food.key
                            )
                          )
                        }
                        className={`hover:scale-125 ${styles.tooltip}`}
                      >
                        <span className={`${styles.tooltiptext}`}>Delete</span>
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center sm:flex-row xs:flex-col justify-between mt-[5%] w-[100%]">
                  <Button
                    text="Log Meal"
                    type="submit"
                    styles="bg-success text-dark-contrast w-[100%] xl:text-md lg:text-xs"
                  />
                  <p className="lg:text-xs xl:text-[90%] xs:text-center w-full">
                    Total:{" "}
                    {selectedFoods.reduce(
                      (acc, currVal) => (acc += currVal.calories),
                      0
                    )}{" "}
                    kcal
                  </p>
                  <Button
                    text="Add Food"
                    type="button"
                    styles="bg-success text-dark-contrast w-[100%] xs:block lg:hidden xl:text-md xs:text-sm"
                    onClick={() => setShowAddFoodModal(true)}
                  />
                </div>
              </form>
            </div>
          </PageSection>
        </div>
      </PageWrapper>
      <CreateFoodModal
        display={showCreateFoodModal}
        setShowModal={(val: boolean) => setShowCreateFoodModal(val)}
      />
      <AddFoodModal
        showAddFoodModal={showAddFoodModal}
        setShowAddFoodModal={(show) => setShowAddFoodModal(show)}
        selectedFoods={selectedFoods}
        setSelectedFoods={(selectedFoods) => setSelectedFoods(selectedFoods)}
        foodKey={foodKey}
        setKey={(num) => setKey(num)}
        setShowCreateFoodModal={(show) => setShowCreateFoodModal(show)}
      />
    </>
  );
}
