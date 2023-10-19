import { useContext } from "react";
import { Button } from "./Button";
import { UserContentContext } from "./Providers/UserContentProvider";
import { buyFood } from "@/app/(utils)/requests";
import toast from "react-hot-toast";

export const StoreOption = ({
  foodName,
  calories,
}: {
  foodName: string;
  calories: number;
}) => {
  const { user, setUser } = useContext(UserContentContext);
  let cost = 0;

  switch (
    calories === 350 ||
    (calories > 350 && calories < 500) ||
    (calories >= 500 && calories < 750) ||
    calories >= 750
  ) {
    case calories === 350:
      cost = 3;
      break;
    case calories > 350 && calories < 500:
      cost = 5;
      break;
    case calories >= 500 && calories < 750:
      cost = 7;
      break;
    case calories >= 750:
      cost = 10;
      break;
  }

  return (
    <>
      <div className="flex flex-col w-full hover:bg-gray-700 rounded">
        <div className="flex w-full h-full justify-between items-center">
          <p className="text-4xl mb-[10px] cursor-default">{foodName}</p>
          <div className="flex justify-center items-center">
            <div
              className={`mr-2 text-xl ${
                user.balance >= cost ? "text-white" : "text-red-500"
              }`}
            >
              {cost}🪙
            </div>
            <Button
              text="Buy Food"
              styles={
                "border-2 border-transparent hover:border-green-500 hover:bg-gray-800 disabled:pointer-events-none"
              }
              disabled={user.balance < cost}
              onClick={() => {
                const newBalance = user.balance - cost;
                buyFood(cost, user.balance, user.id).then((res) => {
                  if (!res.ok) {
                    setUser(user);
                  } else {
                    newBalance >= 0 &&
                      setUser({ ...user, balance: newBalance });
                    toast.success("Purchased Meal! Enjoy!🍰");
                  }
                });
              }}
            />
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-500 my-[5px]"></div>
      </div>
    </>
  );
};
