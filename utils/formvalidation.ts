import { TFoodForm } from "@/types";

export const validateEntry = (form: TFoodForm) => {
  if (form.foodSelect) {
    return true;
  } else if (form.amount && form.amountType && form.calories && form.food) {
    return true;
  } else {
    return false;
  }
};
