import { WithKey } from "@/app/add-food/page";
import { TFood } from "@/types";

type Props = {
  food: TFood;
  setSelectedFoods: (foods: WithKey<TFood>[]) => void;
  selectedFoods: WithKey<TFood>[];
  selectedFoodsKey: number;
  setSelectedFoodsKey: (key: number) => void;
};

export default function FoodOption({
  food,
  selectedFoods,
  setSelectedFoods,
  selectedFoodsKey,
  setSelectedFoodsKey,
}: Props) {
  return (
    <div className="flex justify-between border-b-2 hover:border-b-success p-2 bg-light-contrast rounded-pill">
      <div className="flex justify-between gap-4">
        <p className="border-b-2">{food.food}</p>
        <p className="border-b-2">{food.calories} kcal</p>
      </div>
      <button
        onClick={() => {
          setSelectedFoods([
            ...selectedFoods,
            { ...food, key: selectedFoodsKey },
          ]);
          setSelectedFoodsKey(selectedFoodsKey + 1);
        }}
        className="bg-success rounded-pill p-[2px] text-dark-contrast"
      >
        Add Food
      </button>
    </div>
  );
}
