type Props = {
  calories: number;
  foodName: string;
  amount: string;
};

export const Entry = ({ calories, foodName, amount }: Props) => {
  return (
    <div className="border-b-[1px] border-solid border-gray-600 flex justify-between">
      <div className="flex justify-between gap-6">
        <div className="w-[150px]">{amount}</div>
        <div>{foodName}</div>
      </div>
      <div>{calories} kcal</div>
    </div>
  );
};
