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
      className={`border-b-[1px] border-solid border-neutral-400 flex items-center justify-between p-1 ${styles.deleteShow} hover:border-green-500`}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="xs:w-[100%] lg:w-[150px] xs:text-sm lg:text-xl whitespace-nowrap">
          {amount}
        </div>
        <div className="xs:w-[100%] lg:w-[400px] xs:text-sm lg:text-xl">
          {foodName}
        </div>
      </div>
      <div className="xs:text-sm lg:text-xl whitespace-nowrap xs:ml-[6px] lg:ml-0 xs:mr-[6px] lg:mr-0">
        {calories} kcal
      </div>
      <Button
        text="Delete"
        styles="xs:opacity-100 lg:opacity-0 hover:bg-red-700 p-[5px] lg:text-xl xs:text-xs"
        onClick={() => deleteEntry()}
      />
    </div>
  );
};
