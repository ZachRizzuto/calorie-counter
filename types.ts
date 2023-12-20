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
  createdAt: number;
  foodId: number;
  dayId: number;
  userId: number;
};

export type TDay = {
  id: number;
  userId: number;
  date: string;
};

export type TFoodForm = {
  foodSelect?: string;
  amount: string;
  amountType: string;
  food: string;
  calories: string;
};

export const isUserType = (user: any) => {
  console.log(user);
  if (
    user.userInformation.balance &&
    user.userInformation.user &&
    user.userInformation.calorie_goal
  ) {
    return true;
  }
  return false;
};
