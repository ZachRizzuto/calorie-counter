import { useContext, useState } from "react";
import FoodOption from "./FoodOption";
import { TFood } from "@/types";
import { Button } from "./Button";
import { UserContentContext } from "./Providers/UserContentProvider";
import { WithKey } from "@/app/add-food/page";

type Props = {
  showAddFoodModal: boolean;
  setShowAddFoodModal: (show: boolean) => void;
  selectedFoods: WithKey<TFood>[];
  setSelectedFoods: (food: WithKey<TFood>[]) => void;
  foodKey: number;
  setKey: (key: number) => void;
  setShowCreateFoodModal: (show: boolean) => void;
};

export default function AddFoodModal({
  selectedFoods,
  setSelectedFoods,
  foodKey,
  setKey,
  setShowCreateFoodModal,
  showAddFoodModal,
  setShowAddFoodModal,
}: Props) {
  const [searchInput, setSearchInput] = useState("");

  const { allFoods } = useContext(UserContentContext);

  return (
    <>
      <div
        className={`${
          showAddFoodModal ? `top-[14%]` : `top-[100%]`
        } absolute bg-dark-contrast h-[80vh] w-[92vw] left-[4%] rounded-pill p-2`}
      >
        <div className="w-[100%] h-full flex flex-col gap-2">
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
              <button onClick={() => setShowAddFoodModal(false)}>
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
          <div className="flex flex-col h-[85%] overflow-scroll gap-2 p-2">
            {allFoods
              .filter((food) => food.food.toLowerCase().includes(searchInput))
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
          <div className="w-[100%] ml-auto flex justify-end items-center">
            <p className="inline mr-4 lg:text-sm md:text-xs">{`Don't see your food?`}</p>
            <Button
              text="Create Food"
              styles="bg-light-contrast md:text-sm"
              onClick={() => {
                setShowCreateFoodModal(true);
                setShowAddFoodModal(false);
              }}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
