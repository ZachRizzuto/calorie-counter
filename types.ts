export type TUser = {
  user: string;
  calorie_goal: number;
  balance: number;
};

export type TFood = {
  id: number;
  food: string;
  calories: number;
  amount: string;
};

export type TEntry = {
  id: number;
  createdAt: string;
  userId: number;
  dayId: number;
  mealType: string;
  foods: Food[];
  mealName: string;
};

type Food = {
  id: number;
  entryId: number;
  foodId: number;
  food: TFood;
};

export type TDay = {
  id: number;
  userId: number;
  date: string;
  entries: TEntry[];
};

export type TFoodForm = {
  foodSelect?: string;
  amount: string;
  amountType: string;
  food: string;
  calories: string;
};

export type TEntryForm = {
  dayId: number;
  foodsIds: number[];
  mealType: string;
  mealName: string;
};
