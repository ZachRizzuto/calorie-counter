"use client";
import { Header } from "@/Components/Header";
import { Nav } from "@/Components/Nav";
import { PageSection } from "@/Components/PageSection";
import { PageWrapper } from "@/Components/PageWrapper";
import styles from "./food-form.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/Components/Providers/UserProvider";
import { TFood, TFoodForm } from "@/types";
import { getAllFoods, postEntry, postFood } from "../(utils)/requests";
import { Button } from "@/Components/Button";
import toast from "react-hot-toast";

export default function AddFoodForm() {
  const { user, userFoods, setUserFoods } = useContext(UserContext);

  const [formData, setFormData] = useState<TFoodForm>({
    foodSelect: "",
    amount: "",
    amountType: "oz",
    food: "",
    calories: "",
  });
  const [allFoods, setAllFoods] = useState<TFood[]>([]);

  const handleFormPost = (newFood: TFoodForm) => {
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
      .then((res) => {
        const newFoods = [...userFoods];
        newFoods.push(res);

        const newEntry = {
          userId: user.id,
          dayId: 1,
          createdAt: 12312123,
          foodId: res.id,
        };

        postEntry(newEntry);

        setUserFoods(newFoods);
        toast.success("Added entry!");
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.add(styles.entry);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
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

                handleFormPost(formData);

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
                        type="number"
                        className="min-w-[75px] w-full mb-2"
                        name="amount"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                      />
                      <select
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
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="foodName">Food</label>
                    <input
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
          <option key={food.id} value={food.id}>
            {`${food.amount} | ${food.food} | ${food.calories} kcal`}
          </option>
        ))}
      </datalist>
    </>
  );
}
