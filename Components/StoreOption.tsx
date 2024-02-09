import {
  buyFood,
  getJwtTokenFromLocalStorage,
  postEntry,
} from "@/app/(utils)/requests";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Button } from "./Button";
import { UserContentContext } from "./Providers/UserContentProvider";
import { useRouter } from "next/navigation";

export const StoreOption = ({
  foodName,
  calories,
  foodId,
}: {
  foodName: string;
  calories: number;
  foodId: number;
}) => {
  const { user, setUser, today, setTodaysEntries, todaysEntries } =
    useContext(UserContentContext);

  const router = useRouter();

  let cost = 0;

  switch (
    calories === 350 ||
    (calories > 350 && calories < 500) ||
    (calories >= 500 && calories < 750) ||
    calories >= 750
  ) {
    case calories >= user.calorie_goal * 0.35 &&
      calories < user.calorie_goal * 0.4:
      cost = 12;
      break;
    case calories >= user.calorie_goal * 0.4 &&
      calories < user.calorie_goal * 0.45:
      cost = 15;
      break;
    case calories >= user.calorie_goal * 0.45:
      cost = 20;
      break;
  }

  return (
    <>
      <div className="flex flex-col w-full hover:bg-light-contrast rounded">
        <div className="flex w-full h-full justify-between items-center">
          <p className="xs:text-2xl sm:text-4xl mb-[10px] cursor-default">
            {foodName}
          </p>
          <div className="flex justify-center items-center">
            <div
              className={`mr-2 sm:text-xl xs:text-lg ${
                user.balance >= cost ? "text-white" : "text-red-500"
              }`}
            >
              {cost}🪙
            </div>
            <Button
              text={`Purchase Meal`}
              styles={
                "border-2 border-transparent hover:border-green-500 hover:bg-dark-contrast disabled:pointer-events-none xs:text-xs sm:text-xl"
              }
              disabled={user.balance < cost}
              onClick={async () => {
                const newBalance = user.balance - cost;
                await buyFood(
                  cost,
                  user.balance,
                  getJwtTokenFromLocalStorage(),
                  user.user
                ).then((res) => {
                  if (!res.ok) {
                    setUser(user);
                  } else {
                    newBalance >= 0 &&
                      setUser({ ...user, balance: newBalance });
                    toast.success("Purchased Meal! Enjoy!🍰", {
                      position: "bottom-right",
                      style: {
                        backgroundColor: "#5285A4",
                        color: "white",
                      },
                    });
                  }
                });
                const newCheatEntry = {
                  mealName: foodName,
                  mealType: "Cheat Meal🎂",
                  foodsIds: [foodId],
                  dayId: today.id,
                };

                await postEntry(newCheatEntry, getJwtTokenFromLocalStorage())
                  .then((entry) => {
                    router.push("/today");
                    setTodaysEntries([...todaysEntries, entry]);
                  })
                  .catch((e) => console.log(e));
              }}
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-500 my-[5px]"></div>
      </div>
    </>
  );
};
