"use client";
import { Header } from "@/Components/Header";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import styles from "./food-form.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContentContext } from "@/Components/Providers/UserContentProvider";
import { TEntry, TFood, TFoodForm } from "@/types";
import { getAllFoods, postEntry, postFood } from "../(utils)/requests";
import { Button } from "@/Components/Button";
import toast from "react-hot-toast";
import { getTime } from "@/utils/date";
import { validateEntry } from "@/utils/formvalidation";

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
  } = useContext(UserContentContext);

  const [formData, setFormData] = useState<TFoodForm>({
    foodSelect: "",
    amount: "",
    amountType: "oz",
    food: "",
    calories: "",
  });

  const isCustomFoodDisabled =
    !(formData.foodSelect == undefined) || formData.foodSelect
      ? formData.foodSelect.length > 0
      : false;

  const isFoodSelectDisabled =
    !(formData.amount.length === 0) ||
    !(formData.food.length === 0) ||
    !(formData.calories.length === 0);

  const handleFormPost = (newFood: TFoodForm) => {
    const selectedFood = newFood.foodSelect
      ? parseInt(newFood.foodSelect)
      : undefined;

    const selectedFoodData = selectedFood
      ? allFoods.find((food) => food.id === selectedFood)
      : undefined;

    if (selectedFoodData) {
      const newEntry = {
        userId: user.id,
        dayId: today.id,
        createdAt: getTime(),
        foodId: selectedFoodData.id,
      };

      postEntry(newEntry)
        .then((entry: TEntry) => {
          setUserEntries([...userEntries, entry]);
          setTodaysEntries([...todaysEntries, entry]);
          setTotalCalories(totalCalories + selectedFoodData.calories);
          toast.success("Added entry!");
        })
        .catch(() => toast.error("Couldn't post entry"));
    } else if (
      allFoods.find(
        (food) =>
          food.food === newFood.food &&
          food.calories === parseInt(newFood.calories) &&
          food.amount === `${newFood.amount} ${newFood.amountType}`
      )
    ) {
      const foodName = newFood.food;
      const calories = parseInt(newFood.calories);

      const matchedFood = allFoods.find(
        (food) =>
          food.food === foodName &&
          food.calories === calories &&
          food.amount === `${newFood.amount} ${newFood.amountType}`
      );

      if (matchedFood) {
        const newEntry = {
          userId: user.id,
          dayId: today.id,
          createdAt: getTime(),
          foodId: matchedFood.id,
        };

        setTotalCalories(totalCalories + matchedFood.calories);
        postEntry(newEntry).then((entry) => {
          setUserEntries([...userEntries, entry]);
          setTodaysEntries([...todaysEntries, entry]);
          toast.success("Added entry!");
        });
      }
    } else {
      const foodName = newFood.food;
      const calories = parseInt(newFood.calories);
      const amount = `${newFood.amount} ${newFood.amountType}`;

      const food = {
        food: foodName,
        calories: calories,
        amount: amount,
      };

      postFood(food)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Couldn't add entry");
          } else {
            return res.json();
          }
        })
        .then((res: TFood) => {
          const newFoods = [...allFoods, res];

          setTotalCalories(totalCalories + res.calories);

          const newEntry = {
            userId: user.id,
            dayId: today.id,
            createdAt: getTime(),
            foodId: res.id,
          };

          postEntry(newEntry).then((entry: TEntry) => {
            setUserEntries([...userEntries, entry]);
            setTodaysEntries([...todaysEntries, entry]);
            toast.success("Added entry!");
          });

          setAllFoods(newFoods);
          setAllFoods(newFoods);
        });
    }
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

    getAllFoods().then((foods) => setAllFoods(foods));
  }, []);

  return (
    <>
      <PageWrapper>
        <Nav />
        <div
          id="form"
          className={`flex text-white items-center justify-center h-[100vh] p-[30px] gap-2 ${styles.formTransition} `}
        >
          <PageSection
            styles={{
              height: "",
              width: "w-[50%]",
            }}
          >
            <Header text="Add Food Entry" />
            <form
              className="w-full h-full flex flex-col justify-center items-center gap-10"
              onSubmit={(e) => {
                e.preventDefault();

                if (validateEntry(formData)) {
                  handleFormPost(formData);
                } else {
                  alert("Missing Info Please Fill Out Entire Form");
                }

                setFormData({
                  foodSelect: "",
                  amount: "",
                  amountType: "oz",
                  food: "",
                  calories: "",
                });
              }}
            >
              <div className="w-full h-full">
                <h2>Food Selection</h2>
                <div className="w-full h-full flex justify-center items-center">
                  <input
                    disabled={isFoodSelectDisabled}
                    type="text"
                    list="prevFoods"
                    className="max-w-[350px] w-full"
                    value={formData?.foodSelect}
                    onChange={(e) =>
                      setFormData({ ...formData, foodSelect: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="h-full w-full">
                <h2>New Food Entry</h2>
                <div className="flex flex-col gap-10 w-full h-full justify-center items-center max-w-[350px] mx-auto">
                  <div className="flex flex-col w-full">
                    <label htmlFor="amount">Amount</label>
                    <div>
                      <input
                        disabled={isCustomFoodDisabled}
                        type="number"
                        className="min-w-[75px] w-full mb-2"
                        name="amount"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                      />
                      <select
                        disabled={isCustomFoodDisabled}
                        name="amount"
                        id="amount"
                        className="relative top-[1px] w-full"
                        value={formData.amountType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            amountType: e.target.value,
                          })
                        }
                      >
                        <option value="oz">oz</option>
                        <option value="g">g</option>
                        <option value="cup">cup</option>
                        <option value="tablespoon">tablespoon</option>
                        <option value="teaspoon">teaspoon</option>
                        <option value="whole">whole</option>
                        <option value="1/4">1/4</option>
                        <option value="1/4">1/8</option>
                        <option value="1/4">1/2</option>
                        <option value="1/3">1/3</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="foodName">Food</label>
                    <input
                      disabled={isCustomFoodDisabled}
                      type="text"
                      list="foods"
                      name="foodName"
                      value={formData.food}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          food: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="calories">Calories</label>
                    <input
                      disabled={isCustomFoodDisabled}
                      type="number"
                      name="calories"
                      value={formData.calories}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          calories: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <Button
                text="Add Entry"
                type="submit"
                styles={`mt-6 hover:bg-transparent-theme`}
              />
            </form>
          </PageSection>
        </div>
      </PageWrapper>
      <datalist id="foods">
        {allFoods.map((food) => (
          <option key={food.id} value={food.food}>
            {food.food}
          </option>
        ))}
      </datalist>
      <datalist id="prevFoods">
        {allFoods.map((food) => (
          <option
            key={food.id}
            value={food.id}
          >{`${food.amount} | ${food.food} | ${food.calories} kcal`}</option>
        ))}
      </datalist>
    </>
  );
}
