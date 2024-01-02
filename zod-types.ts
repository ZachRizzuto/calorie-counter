import z from "zod";

export const localStorageUserSchema = z.object({
  token: z.string(),
  userInformation: z.object({
    balance: z.number(),
    calorie_goal: z.number(),
    user: z.string(),
  }),
});

export const userSchema = z.object({
  user: z.string(),
  balance: z.number(),
  calorie_goal: z.number(),
});
