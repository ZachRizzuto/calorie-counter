import _ from "lodash";
import { writeFileSync } from "fs";
const date = new Date();
const range = _.range;
const sample = _.sample;

const userAmount = 2;

const foods = [
  {
    id: 1,
    food: "banana",
    calories: 80,
    amount: "1 oz",
  },
  {
    id: 2,
    food: "apple",
    calories: 50,
    amount: "1 oz",
  },
  {
    id: 3,
    food: "blueberries",
    calories: 120,
    amount: "1 oz",
  },
  {
    id: 4,
    food: "peanut butter",
    calories: 150,
    amount: "2 tablespoons",
  },
];

const daysAmount = 2;

const db = {
  Users: range(userAmount).map((_, id) => ({
    id,
    user: id === 0 ? "guest" : "guest2",
    password: "password",
    calorie_goal: id === 0 ? 2000 : 3500,
  })),
  Foods: foods.map((food) => food),
  days: range(daysAmount).map((_, id) => {
    if (id === 0) {
      return {
        id,
        userId: id,
        date: "9/1/23",
      };
    } else {
      return {
        id,
        userId: id,
        date: "9/1/23",
      };
    }
  }),
  entries: range(5).map((_, id) => {
    switch (id) {
      case 0:
        return {
          id,
          createdAt: date.getTime(),
          foodId: 1,
          dayId: 2,
          userId: 0,
        };

      case 1:
        return {
          id,
          createdAt: date.getTime(),
          foodId: 4,
          dayId: 2,
          userId: 1,
        };

      case 2:
        return {
          id,
          createdAt: date.getTime(),
          foodId: 1,
          userId: 0,
          dayId: 2,
        };

      case 3:
        return {
          id,
          createdAt: date.getTime(),
          foodId: 2,
          userId: 0,
          dayId: 2,
        };
      case 4:
        return {
          id,
          createdAt: date.getTime(),
          foodId: 3,
          userId: 0,
          dayId: 2,
        };
    }
  }),
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
