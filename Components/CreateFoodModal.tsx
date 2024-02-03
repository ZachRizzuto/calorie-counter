import toast from "react-hot-toast";
import { Button } from "./Button";
import { useContext, useState } from "react";
import { UserContentContext } from "./Providers/UserContentProvider";
import { getJwtTokenFromLocalStorage, postFood } from "@/app/(utils)/requests";
import { set } from "zod";

export default function CreateFoodModal({
  display,
  setShowModal,
}: {
  display: boolean;
  setShowModal: (val: boolean) => void;
}) {
  const { setAllFoods, allFoods } = useContext(UserContentContext);

  const [createFoodForm, setCreateFoodForm] = useState({
    food: "",
    amountNum: "",
    amountType: "Whole",
    calories: "",
  });

  const resetForm = () => {
    setCreateFoodForm({
      food: "",
      amountNum: "",
      amountType: "Whole",
      calories: "",
    });

    setShowModal(false);
  };

  return (
    <>
      <div
        className={`absolute flex justify-center items-center bg-light-contrast h-screen w-screen ${
          display ? "top-[0]" : "top-[100%]"
        }`}
      >
        <button
          onClick={() => setShowModal(false)}
          className="text-4xl absolute top-[0] left-[98%] z-10"
        >
          X
        </button>
        <form
          action=""
          className="flex flex-col gap-2 w-[25%]"
          onSubmit={(e) => {
            e.preventDefault();

            toast.success("Submitted");

            console.log({
              food: createFoodForm.food,
              amount: `${createFoodForm.amountNum} ${createFoodForm.amountType}`,
              calories: createFoodForm.calories,
            });

            postFood(
              {
                food: createFoodForm.food,
                amount: `${createFoodForm.amountNum} ${createFoodForm.amountType}`,
                calories: parseInt(createFoodForm.calories),
              },
              getJwtTokenFromLocalStorage()
            ).then((food) => {
              setAllFoods([...allFoods, food]);
            });

            resetForm();
          }}
        >
          <div className="flex gap-2 items-center w-full">
            <label htmlFor="food-name" className="min-w-[200px]">
              What is this food called?:
            </label>
            <div className="flex justify-center items-center bg-white rounded-pill h-[40px] w-full">
              <input
                type="text"
                id="food-name"
                value={createFoodForm.food}
                onChange={(e) =>
                  setCreateFoodForm({ ...createFoodForm, food: e.target.value })
                }
                className="w-[90%] text-xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="food-amount" className="min-w-[200px]">
              What is the amount of food?:{" "}
            </label>
            <div className="flex justify-center items-center bg-white rounded-pill h-[40px] w-full">
              <input
                type="text"
                id="food-amount"
                value={createFoodForm.amountNum}
                onChange={(e) =>
                  setCreateFoodForm({
                    ...createFoodForm,
                    amountNum: e.target.value,
                  })
                }
                className="w-[90%] text-xl"
              />
            </div>
            <div className="w-[2px] bg-white h-[40px]"></div>
            <select
              name=""
              id=""
              value={createFoodForm.amountType}
              onChange={(e) =>
                setCreateFoodForm({
                  ...createFoodForm,
                  amountType: e.target.value,
                })
              }
              className="text-xl rounded-pill h-[40px]"
            >
              <option value="Whole">Whole</option>
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <label htmlFor="calories" className="min-w-[200px]">
              How many calories?:{" "}
            </label>
            <div className="flex justify-center items-center bg-white rounded-pill h-[40px] w-full">
              <input
                type="text"
                id="calories"
                value={createFoodForm.calories}
                onChange={(e) =>
                  setCreateFoodForm({
                    ...createFoodForm,
                    calories: e.target.value,
                  })
                }
                className="w-[90%] text-xl"
              />
            </div>
          </div>

          <Button
            text="Create Food"
            styles="text-dark-contrast bg-success"
            type="submit"
          />
        </form>
      </div>
    </>
  );
}
