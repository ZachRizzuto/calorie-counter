import { TEntry } from "@/types";
import { Button } from "./Button";
import styles from "./Entry.module.css";

type Props = {
  calories: number;
  foodName: string;
  amount: string;
  deleteEntry: () => void;
};

export const Entry = ({ calories, foodName, amount, deleteEntry }: Props) => {
  return (
    <div
      className={`border-b-[1px] border-solid border-gray-600 flex items-center justify-between p-1 ${styles.deleteShow}`}
    >
      <div className="flex justify-between gap-6">
        <div className="w-[150px]">{amount}</div>
        <div className="w-[100px]">{foodName}</div>
      </div>
      <div>
        <div>{calories} kcal</div>
      </div>
      <Button
        text="Delete"
        styles="opacity-0 hover:bg-red-700 p-[5px]"
        onClick={() => deleteEntry()}
      />
    </div>
  );
};
